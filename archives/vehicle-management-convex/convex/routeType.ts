import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAppUserFromUserId } from "./utils";

// ========== Mutations ==========
/**
 * Create a new route type
 */
export const createRouteType = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    // Check if route type name already exists for this company (or globally if no company)
    let existingQuery = ctx.db
      .query("route_types")
      .withIndex("by_company_name", (q) => q.eq("companyId", args.companyId).eq("name", args.name));

    const existingRouteType = await existingQuery.first();

    if (existingRouteType && existingRouteType.isActive !== false) {
      throw new ConvexError("Route type with this name already exists for this company");
    }

    // Validate company exists if provided
    if (args.companyId) {
      const company = await ctx.db.get(args.companyId);
      if (!company || company.isActive === false) {
        throw new ConvexError("Company not found or inactive");
      }
    }

    const now = Date.now();

    const routeTypeId = await ctx.db.insert("route_types", {
      name: args.name,
      description: args.description,
      companyId: args.companyId,
      isDefault: false,
      createdBy: userId,
      createdAt: now,
      isActive: true,
    });

    return routeTypeId;
  },
});

/**
 * Update an existing route type
 */
export const updateRouteType = mutation({
  args: {
    id: v.id("route_types"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    const routeType = await ctx.db.get(args.id);
    if (!routeType) {
      throw new ConvexError("Route type not found");
    }

    if (routeType.isActive === false) {
      throw new ConvexError("Cannot update deleted route type");
    }

    // Prevent editing default route types
    if (routeType.isDefault) {
      throw new ConvexError("Cannot edit default route types");
    }

    // Check if new name conflicts with existing route types
    if (args.name && args.name !== routeType.name) {
      const companyId = args.companyId ?? routeType.companyId;
      const existingRouteType = await ctx.db
        .query("route_types")
        .withIndex("by_company_name", (q) => q.eq("companyId", companyId).eq("name", args.name!))
        .first();

      if (
        existingRouteType &&
        existingRouteType._id !== args.id &&
        existingRouteType.isActive !== false
      ) {
        throw new ConvexError("Route type with this name already exists for this company");
      }
    }

    // Validate company exists if provided
    if (args.companyId && args.companyId !== routeType.companyId) {
      const company = await ctx.db.get(args.companyId);
      if (!company || company.isActive === false) {
        throw new ConvexError("Company not found or inactive");
      }
    }

    const now = Date.now();

    // Build update object with only provided fields
    const updateData: any = {
      updatedBy: userId,
      updatedAt: now,
    };

    // Only update fields that are provided
    if (args.name !== undefined) updateData.name = args.name;
    if (args.description !== undefined) updateData.description = args.description;
    if (args.companyId !== undefined) updateData.companyId = args.companyId;

    await ctx.db.patch(args.id, updateData);

    return args.id;
  },
});

/**
 * Soft delete a route type
 */
export const deleteRouteType = mutation({
  args: {
    id: v.id("route_types"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    const routeType = await ctx.db.get(args.id);
    if (!routeType) {
      throw new ConvexError("Route type not found");
    }

    if (routeType.isActive === false) {
      throw new ConvexError("Route type is already deleted");
    }

    // Prevent deleting default route types
    if (routeType.isDefault) {
      throw new ConvexError("Cannot delete default route types");
    }

    // Check if route type is being used by any routes
    const routesUsingType = await ctx.db
      .query("routes")
      .withIndex("by_route_type", (q) => q.eq("routeTypeId", args.id))
      .filter((q) => q.neq(q.field("isActive"), false))
      .collect();

    if (routesUsingType.length > 0) {
      throw new ConvexError(
        "Cannot delete route type that is being used by active routes. Update or delete those routes first.",
      );
    }

    const now = Date.now();

    await ctx.db.patch(args.id, {
      isActive: false,
      deletedAt: now,
      deletedBy: userId,
    });

    return args.id;
  },
});

// ========== Queries ==========

/**
 * Get all route types with optional filtering
 */
export const getRouteTypes = query({
  args: {
    includeInactive: v.optional(v.boolean()),
    companyId: v.optional(v.id("companies")),
    includeDefaults: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let routeTypes;

    // Filter by company if specified
    if (args.companyId !== undefined) {
      routeTypes = await ctx.db
        .query("route_types")
        .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
        .collect();
    } else {
      routeTypes = await ctx.db.query("route_types").collect();
    }

    // Filter by active status
    if (!args.includeInactive) {
      routeTypes = routeTypes.filter((routeType) => routeType.isActive !== false);
    }

    // Filter defaults if specified
    if (args.includeDefaults === false) {
      routeTypes = routeTypes.filter((routeType) => !routeType.isDefault);
    } else if (args.includeDefaults === true && args.companyId) {
      // Include both company-specific and default route types
      const defaultRouteTypes = await ctx.db
        .query("route_types")
        .withIndex("by_default", (q) => q.eq("isDefault", true))
        .filter((q) => q.neq(q.field("isActive"), false))
        .collect();

      // Merge and deduplicate
      const allRouteTypes = [...routeTypes, ...defaultRouteTypes];
      const uniqueRouteTypes = allRouteTypes.filter(
        (routeType, index, self) => index === self.findIndex((rt) => rt._id === routeType._id),
      );
      routeTypes = uniqueRouteTypes;
    }

    // Apply limit if specified
    if (args.limit) {
      routeTypes = routeTypes.slice(0, args.limit);
    }

    return routeTypes;
  },
});

/**
 * Get a specific route type by ID
 */
export const getRouteType = query({
  args: {
    id: v.id("route_types"),
  },
  handler: async (ctx, args) => {
    const routeType = await ctx.db.get(args.id);

    if (!routeType || routeType.isActive === false) {
      return null;
    }

    return routeType;
  },
});

/**
 * Get route type by name for a specific company
 */
export const getRouteTypeByName = query({
  args: {
    name: v.string(),
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const routeType = await ctx.db
      .query("route_types")
      .withIndex("by_company_name", (q) => q.eq("companyId", args.companyId).eq("name", args.name))
      .filter((q) => q.neq(q.field("isActive"), false))
      .first();

    return routeType;
  },
});

/**
 * Get default route types
 */
export const getDefaultRouteTypes = query({
  args: {
    includeInactive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let routeTypes = await ctx.db
      .query("route_types")
      .withIndex("by_default", (q) => q.eq("isDefault", true))
      .collect();

    if (!args.includeInactive) {
      routeTypes = routeTypes.filter((routeType) => routeType.isActive !== false);
    }

    return routeTypes;
  },
});

/**
 * Search route types by name
 */
export const searchRouteTypes = query({
  args: {
    searchTerm: v.string(),
    companyId: v.optional(v.id("companies")),
    includeInactive: v.optional(v.boolean()),
    includeDefaults: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let routeTypes = await ctx.db.query("route_types").collect();

    const filteredRouteTypes = routeTypes.filter((routeType) => {
      // Filter by active status
      if (!args.includeInactive && routeType.isActive === false) {
        return false;
      }

      // Filter by company
      if (args.companyId !== undefined && routeType.companyId !== args.companyId) {
        // Include defaults if specified
        if (args.includeDefaults && routeType.isDefault) {
          // Keep default route types
        } else {
          return false;
        }
      }

      // Filter defaults if specified
      if (args.includeDefaults === false && routeType.isDefault) {
        return false;
      }

      const searchLower = args.searchTerm.toLowerCase();

      // Search in name and description
      return (
        routeType.name.toLowerCase().includes(searchLower) ||
        routeType.description?.toLowerCase().includes(searchLower)
      );
    });

    // Apply limit if specified
    if (args.limit) {
      return filteredRouteTypes.slice(0, args.limit);
    }

    return filteredRouteTypes;
  },
});

/**
 * Get route type statistics
 */
export const getRouteTypeStats = query({
  args: {
    routeTypeId: v.optional(v.id("route_types")),
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    if (args.routeTypeId) {
      // Stats for specific route type
      const routes = await ctx.db
        .query("routes")
        .withIndex("by_route_type", (q) => q.eq("routeTypeId", args.routeTypeId))
        .filter((q) => q.neq(q.field("isActive"), false))
        .collect();

      return {
        totalRoutes: routes.length,
        routesByCompany: routes.reduce((acc: Record<string, number>, route) => {
          const companyId = route.companyId || "unassigned";
          acc[companyId] = (acc[companyId] || 0) + 1;
          return acc;
        }, {}),
      };
    }

    // Global stats
    const routeTypes = await ctx.db.query("route_types").collect();
    const activeRouteTypes = routeTypes.filter((rt) => rt.isActive !== false);

    let stats = {
      totalRouteTypes: activeRouteTypes.length,
      defaultRouteTypes: activeRouteTypes.filter((rt) => rt.isDefault).length,
      customRouteTypes: activeRouteTypes.filter((rt) => !rt.isDefault).length,
      routeTypesByCompany: {} as Record<string, number>,
    };

    // Count route types by company
    activeRouteTypes.forEach((routeType) => {
      if (routeType.companyId) {
        const companyId = routeType.companyId;
        stats.routeTypesByCompany[companyId] = (stats.routeTypesByCompany[companyId] || 0) + 1;
      }
    });

    return stats;
  },
});

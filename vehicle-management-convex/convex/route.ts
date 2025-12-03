import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAppUserFromUserId } from "./utils";

// ========== Mutations ==========

/**
 * Create a new route
 */
export const createRoute = mutation({
  args: {
    companyId: v.optional(v.id("companies")),
    name: v.string(),
    routeTypeId: v.optional(v.id("route_types")),
    baseAmount: v.optional(v.number()),

    // Route details
    startLocation: v.optional(v.string()),
    endLocation: v.optional(v.string()),
    distance: v.optional(v.number()),
    estimatedDuration: v.optional(v.number()),

    // Start address details
    startAddress: v.optional(v.string()),
    startPincode: v.optional(v.string()),
    startState: v.optional(v.string()),

    // End address details
    endAddress: v.optional(v.string()),
    endPincode: v.optional(v.string()),
    endState: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;
    if (args.companyId) {
      const company = await ctx.db.get(args.companyId);
      if (!company || company.isActive === false) {
        throw new ConvexError("Company not found or inactive");
        // Validate company exists
      }
    }

    // Check if route name already exists for this company
    const existingRoute = await ctx.db
      .query("routes")
      .withIndex("by_company_name", (q) => q.eq("companyId", args.companyId).eq("name", args.name))
      .first();

    if (existingRoute && existingRoute.isActive !== false) {
      throw new ConvexError("Route with this name already exists for this company");
    }

    // Validate route type exists if provided
    if (args.routeTypeId) {
      const routeType = await ctx.db.get(args.routeTypeId);
      if (!routeType || routeType.isActive === false) {
        throw new ConvexError("Route type not found or inactive");
      }
    }

    const now = Date.now();

    const routeId = await ctx.db.insert("routes", {
      companyId: args.companyId,
      name: args.name,
      routeTypeId: args.routeTypeId,
      baseAmount: args.baseAmount,
      startLocation: args.startLocation,
      endLocation: args.endLocation,
      distance: args.distance,
      estimatedDuration: args.estimatedDuration,
      startAddress: args.startAddress,
      startPincode: args.startPincode,
      startState: args.startState,
      endAddress: args.endAddress,
      endPincode: args.endPincode,
      endState: args.endState,
      createdBy: userId,
      createdAt: now,
      isActive: true,
    });

    return routeId;
  },
});

/**
 * Update an existing route
 */
export const updateRoute = mutation({
  args: {
    id: v.id("routes"),
    name: v.optional(v.string()),
    routeTypeId: v.optional(v.id("route_types")),
    baseAmount: v.optional(v.number()),

    // Route details
    startLocation: v.optional(v.string()),
    endLocation: v.optional(v.string()),
    distance: v.optional(v.number()),
    estimatedDuration: v.optional(v.number()),

    // Start address details
    startAddress: v.optional(v.string()),
    startPincode: v.optional(v.string()),
    startState: v.optional(v.string()),

    // End address details
    endAddress: v.optional(v.string()),
    endPincode: v.optional(v.string()),
    endState: v.optional(v.string()),

    // Location details (keeping existing)
    withinState: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    const route = await ctx.db.get(args.id);
    if (!route) {
      throw new ConvexError("Route not found");
    }

    if (route.isActive === false) {
      throw new ConvexError("Cannot update deleted route");
    }

    // Check if new name conflicts with existing routes
    if (args.name && args.name !== route.name) {
      const existingRoute = await ctx.db
        .query("routes")
        .withIndex("by_company_name", (q) =>
          q.eq("companyId", route.companyId).eq("name", args.name!),
        )
        .first();

      if (existingRoute && existingRoute._id !== args.id && existingRoute.isActive !== false) {
        throw new ConvexError("Route with this name already exists for this company");
      }
    }

    // Validate route type exists if provided
    if (args.routeTypeId && args.routeTypeId !== route.routeTypeId) {
      const routeType = await ctx.db.get(args.routeTypeId);
      if (!routeType || routeType.isActive === false) {
        throw new ConvexError("Route type not found or inactive");
      }
    }

    const now = Date.now();

    // Build update object with only provided fields
    const updateData: any = {
      updatedBy: userId,
      updatedAt: now,
    };

    // Only update fields that are provided
    Object.keys(args).forEach((key) => {
      if (key !== "id" && args[key as keyof typeof args] !== undefined) {
        updateData[key] = args[key as keyof typeof args];
      }
    });

    await ctx.db.patch(args.id, updateData);

    return args.id;
  },
});

/**
 * Soft delete a route
 */
export const deleteRoute = mutation({
  args: {
    id: v.id("routes"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    const route = await ctx.db.get(args.id);
    if (!route) {
      throw new ConvexError("Route not found");
    }

    if (route.isActive === false) {
      throw new ConvexError("Route is already deleted");
    }

    // Check if route is being used by any trips
    const tripsUsingRoute = await ctx.db
      .query("trips")
      .withIndex("by_route", (q) => q.eq("routeId", args.id))
      .collect();

    if (tripsUsingRoute.length > 0) {
      throw new ConvexError("Cannot delete route that is being used by trips");
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
 * Get all routes with optional filtering
 */
export const getRoutes = query({
  args: {
    includeInactive: v.optional(v.boolean()),
    companyId: v.optional(v.id("companies")),
    routeTypeId: v.optional(v.id("route_types")),
    withinState: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let routes;

    // Filter by company if specified
    if (args.companyId) {
      const companyId = args.companyId;
      if (args.routeTypeId) {
        routes = await ctx.db
          .query("routes")
          .withIndex("by_company_route_type", (q) =>
            q.eq("companyId", companyId).eq("routeTypeId", args.routeTypeId),
          )
          .collect();
      } else {
        routes = await ctx.db
          .query("routes")
          .withIndex("by_company", (q) => q.eq("companyId", companyId))
          .collect();
      }
    } else if (args.routeTypeId) {
      routes = await ctx.db
        .query("routes")
        .withIndex("by_route_type", (q) => q.eq("routeTypeId", args.routeTypeId))
        .collect();
    } else {
      routes = await ctx.db.query("routes").collect();
    }

    // Filter by active status
    if (!args.includeInactive) {
      routes = routes.filter((route) => route.isActive !== false);
    }

    // Apply limit if specified
    if (args.limit) {
      routes = routes.slice(0, args.limit);
    }

    return routes;
  },
});

/**
 * Get a specific route by ID with route type details
 */
export const getRouteWithDetails = query({
  args: {
    id: v.id("routes"),
  },
  handler: async (ctx, args) => {
    const route = await ctx.db.get(args.id);

    if (!route || route.isActive === false) {
      return null;
    }

    // Get route type details if available
    let routeType = null;
    if (route.routeTypeId) {
      routeType = await ctx.db.get(route.routeTypeId);
    }

    let company = null;
    // Get company details
    if (route.companyId) {
      company = await ctx.db.get(route.companyId);
    }

    return {
      ...route,
      routeType,
      company,
    };
  },
});

/**
 * Get route by name for a specific company
 */
export const getRouteByName = query({
  args: {
    name: v.string(),
    companyId: v.id("companies"),
  },
  handler: async (ctx, args) => {
    const route = await ctx.db
      .query("routes")
      .withIndex("by_company_name", (q) => q.eq("companyId", args.companyId).eq("name", args.name))
      .filter((q) => q.neq(q.field("isActive"), false))
      .first();

    return route;
  },
});

/**
 * Search routes by name, start location, or end location
 */
export const searchRoutes = query({
  args: {
    searchTerm: v.string(),
    companyId: v.optional(v.id("companies")),
    routeTypeId: v.optional(v.id("route_types")),
    includeInactive: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let routes = await ctx.db.query("routes").collect();

    const filteredRoutes = routes.filter((route) => {
      // Filter by active status
      if (!args.includeInactive && route.isActive === false) {
        return false;
      }

      // Filter by company
      if (args.companyId && route.companyId !== args.companyId) {
        return false;
      }

      // Filter by route type
      if (args.routeTypeId && route.routeTypeId !== args.routeTypeId) {
        return false;
      }

      const searchLower = args.searchTerm.toLowerCase();

      // Search in name, start location, end location, and address fields
      return (
        route.name.toLowerCase().includes(searchLower) ||
        route.startLocation?.toLowerCase().includes(searchLower) ||
        route.endLocation?.toLowerCase().includes(searchLower) ||
        route.startAddress?.toLowerCase().includes(searchLower) ||
        route.endAddress?.toLowerCase().includes(searchLower) ||
        route.startState?.toLowerCase().includes(searchLower) ||
        route.endState?.toLowerCase().includes(searchLower)
      );
    });

    // Apply limit if specified
    if (args.limit) {
      return filteredRoutes.slice(0, args.limit);
    }

    return filteredRoutes;
  },
});

/**
 * Get route statistics
 */
export const getRouteStats = query({
  args: {
    companyId: v.optional(v.id("companies")),
    routeTypeId: v.optional(v.id("route_types")),
  },
  handler: async (ctx, args) => {
    let routes = await ctx.db.query("routes").collect();

    // Filter by company if specified
    if (args.companyId) {
      routes = routes.filter((route) => route.companyId === args.companyId);
    }

    // Filter by route type if specified
    if (args.routeTypeId) {
      routes = routes.filter((route) => route.routeTypeId === args.routeTypeId);
    }

    const activeRoutes = routes.filter((r) => r.isActive !== false);

    const stats = {
      totalRoutes: activeRoutes.length,
      routesWithDistance: activeRoutes.filter((r) => r.distance !== undefined).length,
      averageDistance: 0,
      totalDistance: 0,
      averageBaseAmount: 0,
      routesByType: {} as Record<string, number>,
    };

    // Calculate distance and amount averages
    const routesWithDistance = activeRoutes.filter((r) => r.distance !== undefined);
    if (routesWithDistance.length > 0) {
      stats.totalDistance = routesWithDistance.reduce((sum, r) => sum + (r.distance || 0), 0);
      stats.averageDistance = stats.totalDistance / routesWithDistance.length;
    }

    if (activeRoutes.length > 0) {
      stats.averageBaseAmount =
        activeRoutes.reduce((sum, r) => sum + (r.baseAmount ?? 0), 0) / activeRoutes.length;
    }

    // Count routes by type
    activeRoutes.forEach((route) => {
      const typeId = route.routeTypeId || "unassigned";
      stats.routesByType[typeId] = (stats.routesByType[typeId] || 0) + 1;
    });

    return stats;
  },
});

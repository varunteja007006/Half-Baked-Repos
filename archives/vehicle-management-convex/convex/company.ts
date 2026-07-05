import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAppUserFromUserId } from "./utils";
import type { Id } from "./_generated/dataModel";

// ========== Mutations ==========

/**
 * Create a new company
 */
export const createCompany = mutation({
  args: {
    name: v.string(),
    contactPersonName: v.optional(v.string()),
    contactPersonPhone: v.optional(v.string()),
    contactPersonEmail: v.optional(v.string()),

    // Address fields
    addressLine1: v.optional(v.string()),
    addressLine2: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    pincode: v.optional(v.string()),
    country: v.optional(v.string()),

    // Registration and tax details
    companyRegistrationNumber: v.optional(v.string()),
    gstNumber: v.optional(v.string()),
    panNumber: v.optional(v.string()),
    cinNumber: v.optional(v.string()),

    // Company details
    companyType: v.optional(
      v.union(
        v.literal("Private Limited"),
        v.literal("Public Limited"),
        v.literal("LLP"),
        v.literal("Partnership"),
        v.literal("Sole Proprietorship"),
        v.literal("Other"),
      ),
    ),
    incorporationDate: v.optional(v.number()),
    website: v.optional(v.string()),

    // Subsidiary relationship
    parentCompanyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    // Check if company name already exists
    const existingCompany = await ctx.db
      .query("companies")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existingCompany && existingCompany.isActive !== false) {
      throw new ConvexError("Company with this name already exists");
    }

    // Validate parent company exists if provided
    if (args.parentCompanyId) {
      const parentCompany = await ctx.db.get(args.parentCompanyId);
      if (!parentCompany || parentCompany.isActive === false) {
        throw new ConvexError("Parent company not found or inactive");
      }
    }

    // Validate unique GST number if provided
    if (args.gstNumber) {
      const existingGst = await ctx.db
        .query("companies")
        .withIndex("by_gst_number", (q) => q.eq("gstNumber", args.gstNumber))
        .first();

      if (existingGst && existingGst.isActive !== false) {
        throw new ConvexError("Company with this GST number already exists");
      }
    }

    // Validate unique PAN number if provided
    if (args.panNumber) {
      const existingPan = await ctx.db
        .query("companies")
        .withIndex("by_pan_number", (q) => q.eq("panNumber", args.panNumber))
        .first();

      if (existingPan && existingPan.isActive !== false) {
        throw new ConvexError("Company with this PAN number already exists");
      }
    }

    // Validate unique registration number if provided
    if (args.companyRegistrationNumber) {
      const existingReg = await ctx.db
        .query("companies")
        .withIndex("by_registration_number", (q) =>
          q.eq("companyRegistrationNumber", args.companyRegistrationNumber),
        )
        .first();

      if (existingReg && existingReg.isActive !== false) {
        throw new ConvexError("Company with this registration number already exists");
      }
    }

    const now = Date.now();

    const companyId = await ctx.db.insert("companies", {
      name: args.name,
      contactPersonName: args.contactPersonName,
      contactPersonPhone: args.contactPersonPhone,
      contactPersonEmail: args.contactPersonEmail,
      addressLine1: args.addressLine1,
      addressLine2: args.addressLine2,
      city: args.city,
      state: args.state,
      pincode: args.pincode,
      country: args.country,
      companyRegistrationNumber: args.companyRegistrationNumber,
      gstNumber: args.gstNumber,
      panNumber: args.panNumber,
      cinNumber: args.cinNumber,
      companyType: args.companyType,
      incorporationDate: args.incorporationDate,
      website: args.website,
      parentCompanyId: args.parentCompanyId,
      createdBy: userId,
      createdAt: now,
      isActive: true,
    });

    return companyId;
  },
});

/**
 * Update an existing company
 */
export const updateCompany = mutation({
  args: {
    id: v.id("companies"),
    name: v.optional(v.string()),
    contactPersonName: v.optional(v.string()),
    contactPersonPhone: v.optional(v.string()),
    contactPersonEmail: v.optional(v.string()),

    // Address fields
    addressLine1: v.optional(v.string()),
    addressLine2: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    pincode: v.optional(v.string()),
    country: v.optional(v.string()),

    // Registration and tax details
    companyRegistrationNumber: v.optional(v.string()),
    gstNumber: v.optional(v.string()),
    panNumber: v.optional(v.string()),
    cinNumber: v.optional(v.string()),

    // Company details
    companyType: v.optional(
      v.union(
        v.literal("Private Limited"),
        v.literal("Public Limited"),
        v.literal("LLP"),
        v.literal("Partnership"),
        v.literal("Sole Proprietorship"),
        v.literal("Other"),
      ),
    ),
    incorporationDate: v.optional(v.number()),
    website: v.optional(v.string()),

    // Subsidiary relationship
    parentCompanyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    const company = await ctx.db.get(args.id);
    if (!company) {
      throw new ConvexError("Company not found");
    }

    if (company.isActive === false) {
      throw new ConvexError("Cannot update deleted company");
    }

    // Check if new name conflicts with existing companies
    if (args.name && args.name !== company.name) {
      const existingCompany = await ctx.db
        .query("companies")
        .withIndex("by_name", (q) => q.eq("name", args.name!))
        .first();

      if (
        existingCompany &&
        existingCompany._id !== args.id &&
        existingCompany.isActive !== false
      ) {
        throw new ConvexError("Company with this name already exists");
      }
    }

    // Validate parent company if provided and changed
    if (args.parentCompanyId !== undefined && args.parentCompanyId !== company.parentCompanyId) {
      if (args.parentCompanyId) {
        // Check if parent company exists
        const parentCompany = await ctx.db.get(args.parentCompanyId);
        if (!parentCompany || parentCompany.isActive === false) {
          throw new ConvexError("Parent company not found or inactive");
        }

        // Prevent circular dependency - company cannot be its own parent or ancestor
        if (args.parentCompanyId === args.id) {
          throw new ConvexError("Company cannot be its own parent");
        }

        // Check for circular dependency by traversing up the parent chain
        let currentParentId: Id<"companies"> | undefined = args.parentCompanyId;
        const visitedIds = new Set<Id<"companies">>([args.id]);

        while (currentParentId) {
          if (visitedIds.has(currentParentId)) {
            throw new ConvexError("Circular dependency detected in company hierarchy");
          }

          visitedIds.add(currentParentId);
          const parentCompany: any = await ctx.db.get(currentParentId);
          if (!parentCompany) break;

          currentParentId = parentCompany.parentCompanyId;
        }
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
 * Soft delete a company
 */
export const deleteCompany = mutation({
  args: {
    id: v.id("companies"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new ConvexError("User not authenticated");
    }

    const userId = caller.appUser._id;

    const company = await ctx.db.get(args.id);
    if (!company) {
      throw new ConvexError("Company not found");
    }

    if (company.isActive === false) {
      throw new ConvexError("Company is already deleted");
    }

    // Check if company has active subsidiaries
    const subsidiaries = await ctx.db
      .query("companies")
      .withIndex("by_parent_company", (q) => q.eq("parentCompanyId", args.id))
      .filter((q) => q.neq(q.field("isActive"), false))
      .collect();

    if (subsidiaries.length > 0) {
      throw new ConvexError(
        "Cannot delete company with active subsidiaries. Delete or reassign subsidiaries first.",
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
 * Get all companies with optional filtering
 */
export const getCompanies = query({
  args: {
    includeInactive: v.optional(v.boolean()),
    parentCompanyId: v.optional(v.id("companies")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let companies;

    // Filter by parent company if specified
    if (args.parentCompanyId !== undefined) {
      companies = await ctx.db
        .query("companies")
        .withIndex("by_parent_company", (q) => q.eq("parentCompanyId", args.parentCompanyId))
        .collect();
    } else {
      companies = await ctx.db.query("companies").collect();
    }

    // Filter by active status
    if (!args.includeInactive) {
      companies = companies.filter((company) => company.isActive !== false);
    }

    // Apply limit if specified
    if (args.limit) {
      companies = companies.slice(0, args.limit);
    }

    return companies;
  },
});

/**
 * Get a specific company by ID
 */
export const getCompany = query({
  args: {
    id: v.id("companies"),
  },
  handler: async (ctx, args) => {
    const company = await ctx.db.get(args.id);

    if (!company || company.isActive === false) {
      return null;
    }

    return company;
  },
});

/**
 * Get company by name
 */
export const getCompanyByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const company = await ctx.db
      .query("companies")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .filter((q) => q.neq(q.field("isActive"), false))
      .first();

    return company;
  },
});

/**
 * Get all subsidiaries of a company
 */
export const getSubsidiaries = query({
  args: {
    parentCompanyId: v.id("companies"),
    includeInactive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let subsidiaries = await ctx.db
      .query("companies")
      .withIndex("by_parent_company", (q) => q.eq("parentCompanyId", args.parentCompanyId))
      .collect();

    if (!args.includeInactive) {
      subsidiaries = subsidiaries.filter((company) => company.isActive !== false);
    }

    return subsidiaries;
  },
});

/**
 * Get the parent company of a company
 */
export const getParentCompany = query({
  args: {
    companyId: v.id("companies"),
  },
  handler: async (ctx, args) => {
    const company = await ctx.db.get(args.companyId);

    if (!company || !company.parentCompanyId || company.isActive === false) {
      return null;
    }

    const parentCompany = await ctx.db.get(company.parentCompanyId);

    if (!parentCompany || parentCompany.isActive === false) {
      return null;
    }

    return parentCompany;
  },
});

/**
 * Get complete company hierarchy (parent chain)
 */
export const getCompanyHierarchy = query({
  args: {
    companyId: v.id("companies"),
  },
  handler: async (ctx, args) => {
    const hierarchy = [];
    let currentCompanyId: Id<"companies"> | undefined = args.companyId;

    while (currentCompanyId) {
      const company: any = await ctx.db.get(currentCompanyId);

      if (!company || company.isActive === false) {
        break;
      }

      hierarchy.unshift(company); // Add to beginning to get top-down hierarchy
      currentCompanyId = company.parentCompanyId;
    }

    return hierarchy;
  },
});

/**
 * Search companies by name, GST, PAN, or registration number
 */
export const searchCompanies = query({
  args: {
    searchTerm: v.string(),
    includeInactive: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const companies = await ctx.db.query("companies").collect();

    const filteredCompanies = companies.filter((company) => {
      // Filter by active status
      if (!args.includeInactive && company.isActive === false) {
        return false;
      }

      const searchLower = args.searchTerm.toLowerCase();

      // Search in name, GST, PAN, and registration number
      return (
        company.name.toLowerCase().includes(searchLower) ||
        company.gstNumber?.toLowerCase().includes(searchLower) ||
        company.panNumber?.toLowerCase().includes(searchLower) ||
        company.companyRegistrationNumber?.toLowerCase().includes(searchLower) ||
        company.contactPersonName?.toLowerCase().includes(searchLower)
      );
    });

    // Apply limit if specified
    if (args.limit) {
      return filteredCompanies.slice(0, args.limit);
    }

    return filteredCompanies;
  },
});

/**
 * Get company statistics
 */
export const getCompanyStats = query({
  args: {
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const companies = await ctx.db.query("companies").collect();
    const activeCompanies = companies.filter((c) => c.isActive !== false);

    if (args.companyId) {
      const companyId = args.companyId;

      // Stats for specific company - only run when companyId is provided
      const subsidiaries = await ctx.db
        .query("companies")
        .withIndex("by_parent_company", (q) => q.eq("parentCompanyId", companyId))
        .filter((q) => q.neq(q.field("isActive"), false))
        .collect();

      return {
        subsidiaries: subsidiaries.length,
      };
    }

    // Global stats
    let stats = {
      totalCompanies: activeCompanies.length,
      totalSubsidiaries: 0,
      parentCompanies: 0,
      companyHierarchies: 0,
    };

    activeCompanies.forEach((company) => {
      if (company.parentCompanyId) {
        stats.totalSubsidiaries++;
      } else {
        stats.parentCompanies++;
      }
    });

    stats.companyHierarchies = stats.parentCompanies;

    return stats;
  },
});

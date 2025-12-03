import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAppUserFromUserId } from "./utils";

// Create a trip type
export const createTripType = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    sortBy: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new ConvexError("User not authenticated");

    // Prevent duplicates by code/name
    const existing = await ctx.db
      .query("trip_types")
      .withIndex("by_code", (q) => q.eq("code", args.name))
      .first();

    if (existing && existing.isActive !== false) {
      throw new ConvexError("Trip type with this code already exists");
    }

    const now = Date.now();
    const id = await ctx.db.insert("trip_types", {
      code: args.name,
      name: args.name,
      description: args.description,
      sortBy: args.sortBy ?? 0,
      isActive: true,
      createdBy: caller.appUser._id,
      createdAt: now,
    });

    return id;
  },
});

export const updateTripType = mutation({
  args: {
    id: v.id("trip_types"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    sortBy: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new ConvexError("User not authenticated");

    const rec = await ctx.db.get(args.id);
    if (!rec) throw new ConvexError("Trip type not found");
    if (rec.isActive === false) throw new ConvexError("Cannot update deleted trip type");

    const now = Date.now();
    const toPatch: any = { updatedAt: now, updatedBy: caller.appUser._id };
    if (args.name !== undefined) {
      toPatch.name = args.name;
      toPatch.code = args.name;
    }
    if (args.description !== undefined) toPatch.description = args.description;
    if (args.sortBy !== undefined) toPatch.sortBy = args.sortBy;

    await ctx.db.patch(args.id, toPatch);
    return args.id;
  },
});

export const deleteTripType = mutation({
  args: { id: v.id("trip_types") },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new ConvexError("User not authenticated");

    const rec = await ctx.db.get(args.id);
    if (!rec) throw new ConvexError("Trip type not found");
    if (rec.isActive === false) throw new ConvexError("Trip type already deleted");

    // Check usage in trip_v1
    const using = await ctx.db
      .query("trip_v1")
      .withIndex("by_type_id", (q) => q.eq("typeId", args.id))
      .filter((q) => q.neq(q.field("isActive"), false))
      .collect();

    if (using.length > 0) {
      throw new ConvexError("Cannot delete trip type in use by active trips");
    }

    const now = Date.now();
    await ctx.db.patch(args.id, { isActive: false, deletedAt: now, deletedBy: caller.appUser._id });
    return args.id;
  },
});

export const getTripTypes = query({
  args: { includeInactive: v.optional(v.boolean()), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    let rows = await ctx.db.query("trip_types").collect();
    if (!args.includeInactive) rows = rows.filter((r) => r.isActive !== false);
    if (args.limit) rows = rows.slice(0, args.limit);
    return rows;
  },
});

export const getTripType = query({
  args: { id: v.id("trip_types") },
  handler: async (ctx, args) => {
    const rec = await ctx.db.get(args.id);
    if (!rec || rec.isActive === false) return null;
    return rec;
  },
});

export const searchTripTypes = query({
  args: { searchTerm: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const rows = await ctx.db.query("trip_types").collect();
    const filtered = rows.filter((r) => r.name.toLowerCase().includes(args.searchTerm.toLowerCase()));
    if (args.limit) return filtered.slice(0, args.limit);
    return filtered;
  },
});

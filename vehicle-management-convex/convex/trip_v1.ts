import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isAdmin, isSuper } from "./utils";

// Create a trip_v1 record. Admin/Super only.
export const createTripV1 = mutation({
  args: {
    date: v.number(),
    companyId: v.id("companies"),
    routeId: v.id("routes"),
    touchPoint: v.optional(v.string()),
    typeId: v.id("trip_types"),
    routeTypeId: v.id("route_types"),
    vehicleId: v.id("vehicles"),
    driverId: v.id("app_users"),
    tripId: v.optional(v.string()),
    tripSheet: v.optional(v.boolean()),
    cost: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const now = Date.now();

    const id = await ctx.db.insert("trip_v1", {
      date: args.date,
      companyId: args.companyId,
      routeId: args.routeId,
      touchPoint: args.touchPoint ?? undefined,
      typeId: args.typeId,
      routeTypeId: args.routeTypeId,
      vehicleId: args.vehicleId,
      driverId: args.driverId,
      tripId: args.tripId ?? undefined,
      tripSheet: args.tripSheet ?? undefined,
      cost: args.cost ?? undefined,
      createdAt: now,
      createdBy: caller.appUser._id,
      isActive: true,
    });

    return { success: true, id };
  },
});

// Read a single trip_v1 by id
export const getTripV1 = query({
  args: { id: v.id("trip_v1") },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const rec = await ctx.db.get(args.id);
    if (!rec) {
      return { success: false, message: "Not found", data: null };
    }

    const company = await ctx.db.get(rec.companyId);
    const route = await ctx.db.get(rec.routeId);
    const driver = await ctx.db.get(rec.driverId);
    const vehicle = await ctx.db.get(rec.vehicleId);
    const tripType = await ctx.db.get(rec.typeId);
    const routeType = await ctx.db.get(rec.routeTypeId);

    return {
      success: true,
      message: "Found",
      data: {
        ...rec,
        companyName: company?.name || "",
        routeName: route?.name || "",
        driverName: driver?.name || "",
        vehicleName: vehicle?.name || vehicle?.plate || "",
        tripTypeName: tripType?.name || "",
        routeTypeName: routeType?.name || "",
      },
    };
  },
});

// List trips with optional filters
export const listTripV1 = query({
  args: {
    companyId: v.optional(v.id("companies")),
    driverId: v.optional(v.id("app_users")),
    routeId: v.optional(v.id("routes")),
    routeTypeId: v.optional(v.id("route_types")),
    typeId: v.optional(v.id("trip_types")),
    date: v.optional(v.number()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Prefer indexed queries for performance:
    // 1) by companyId, 2) by routeTypeId, 3) by typeId, 4) full scan as fallback
    let rows;
    if (args.companyId) {
      rows = await ctx.db
        .query("trip_v1")
        .withIndex("by_company", (x) => x.eq("companyId", args.companyId!))
        .collect();
    } else if (args.routeTypeId) {
      rows = await ctx.db
        .query("trip_v1")
        .withIndex("by_route_type_id", (x) => x.eq("routeTypeId", args.routeTypeId!))
        .collect();
    } else if (args.typeId) {
      rows = await ctx.db
        .query("trip_v1")
        .withIndex("by_type_id", (x) => x.eq("typeId", args.typeId!))
        .collect();
    } else {
      rows = await ctx.db.query("trip_v1").collect();
    }

    let filtered = rows;

    if (args.driverId) {
      filtered = filtered.filter((r) => r.driverId === args.driverId);
    }
    if (args.routeId) {
      filtered = filtered.filter((r) => r.routeId === args.routeId);
    }
    if (args.routeTypeId) {
      filtered = filtered.filter((r) => r.routeTypeId === args.routeTypeId);
    }
    if (args.typeId) {
      filtered = filtered.filter((r) => r.typeId === args.typeId);
    }
    if (typeof args.date === "number") {
      const startOfDay = args.date;
      const endOfDay = startOfDay + 86400000 - 1; // End of the day in ms
      filtered = filtered.filter((r) => r.date >= startOfDay && r.date <= endOfDay);
    }
    if (typeof args.startDate === "number") {
      filtered = filtered.filter((r) => r.date >= args.startDate!);
    }
    if (typeof args.endDate === "number") {
      filtered = filtered.filter((r) => r.date <= args.endDate!);
    }

    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    const tripsWithNames = await Promise.all(
      filtered.map(async (trip) => {
        const company = await ctx.db.get(trip.companyId);
        const route = await ctx.db.get(trip.routeId);
        const driver = await ctx.db.get(trip.driverId);
        const vehicle = await ctx.db.get(trip.vehicleId);
        const tripType = await ctx.db.get(trip.typeId);
        const routeType = await ctx.db.get(trip.routeTypeId);

        return {
          ...trip,
          companyName: company?.name || "",
          routeName: route?.name || "",
          driverName: driver?.name || "",
          vehicleName:
            `${vehicle?.plate ?? ""} ${vehicle?.name ?? ""}`.trim() || "",
          tripTypeName: tripType?.name || "",
          routeTypeName: routeType?.name || "",
        };
      }),
    );

    return tripsWithNames;
  },
});

// Update trip_v1 - admin/super only
export const updateTripV1 = mutation({
  args: {
    id: v.id("trip_v1"),
    patch: v.object({
      date: v.optional(v.number()),
      companyId: v.optional(v.id("companies")),
      routeId: v.optional(v.id("routes")),
      touchPoint: v.optional(v.string()),
      typeId: v.optional(v.id("trip_types")),
      routeTypeId: v.optional(v.id("route_types")),
      vehicleId: v.optional(v.id("vehicles")),
      driverId: v.optional(v.id("app_users")),
      tripId: v.optional(v.string()),
      tripSheet: v.optional(v.boolean()),
      cost: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles)))
      throw new Error("Not authorized");

    const now = Date.now();
    const toPatch = { ...args.patch, updatedAt: now, updatedBy: caller.appUser._id };
    await ctx.db.patch(args.id, toPatch);
    return { success: true };
  },
});

// Soft-delete trip_v1 - admin/super only
export const deleteTripV1 = mutation({
  args: { id: v.id("trip_v1") },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles)))
      throw new Error("Not authorized");

    const now = Date.now();
    await ctx.db.patch(args.id, {
      deletedAt: now,
      deletedBy: caller.appUser._id,
      isActive: false,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { success: true };
  },
});

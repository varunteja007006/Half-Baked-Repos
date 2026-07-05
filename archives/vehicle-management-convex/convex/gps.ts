import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId } from "./utils";

export const logGpsPing = mutation({
  args: {
    lat: v.number(),
    lng: v.number(),
    tripId: v.optional(v.id("trips")),
  },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);
    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    let targetTripId = args.tripId;

    // If no tripId provided, find the driver's active trip
    if (!targetTripId) {
      const activeTrip = await ctx.db
        .query("trips")
        .withIndex("by_driver", (q) => q.eq("driverId", appUser._id))
        .filter((q) => 
          q.or(
            q.eq(q.field("status"), "InProgress"),
            q.eq(q.field("status"), "InTransit"),
            q.eq(q.field("status"), "Destination")
          )
        )
        .first();

      if (activeTrip) {
        targetTripId = activeTrip._id;
      }
    }

    if (targetTripId) {
      await ctx.db.insert("gps_pings", {
        tripId: targetTripId,
        driverId: appUser._id,
        lat: args.lat,
        lng: args.lng,
        t: Date.now(),
      });
    }

    return { success: true, tripId: targetTripId };
  },
});

export const getLiveLocation = query({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    const latestPing = await ctx.db
      .query("gps_pings")
      .withIndex("by_trip_time", (q) => q.eq("tripId", args.tripId))
      .order("desc")
      .first();

    return latestPing;
  },
});

export const getTripRoute = query({
  args: { 
    tripId: v.id("trips"),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const route = await ctx.db
      .query("gps_pings")
      .withIndex("by_trip_time", (q) => q.eq("tripId", args.tripId))
      .order("asc")
      .take(args.limit || 1000);

    return route;
  },
});

export const getCurrentLocation = query({
  args: {},
  handler: async (ctx) => {
    const result = await getAppUserFromUserId(ctx);
    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    // Find the driver's most recent GPS ping
    const latestPing = await ctx.db
      .query("gps_pings")
      .withIndex("by_driver_time", (q) => q.eq("driverId", appUser._id))
      .order("desc")
      .first();

    return latestPing;
  },
});

//     return latestPing;
//   },
// });

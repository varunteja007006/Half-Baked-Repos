// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const startTrip = mutation({
//   args: {
//     companyId: v.id("companies"),
//     startKm: v.number(),
//     startGatePassId: v.id("_storage"),
//     routeId: v.optional(v.id("routes")),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const appUser = await ctx.db
//       .query("app_users")
//       .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
//       .unique();

//     if (!appUser) {
//       throw new Error("Unauthorized");
//     }

//     // Get the vehicle assigned to the driver
//     const vehicle = await ctx.db
//       .query("vehicles")
//       .withIndex("by_assigned_user", (q) => q.eq("assignedUserId", appUser._id))
//       .unique();

//     if (!vehicle) {
//       throw new Error("No vehicle assigned to driver");
//     }

//     // Check for active trip
//     const activeTrip = await ctx.db
//       .query("trips")
//       .withIndex("by_driver", (q) => q.eq("driverId", appUser._id))
//       .filter((q) => q.neq(q.field("status"), "Completed"))
//       .unique();

//     if (activeTrip) {
//       throw new Error("Driver already has an active trip.");
//     }

//     return await ctx.db.insert("trips", {
//       companyId: args.companyId,
//       driverId: appUser._id,
//       vehicleId: vehicle._id,
//       status: "InProgress",
//       startKm: args.startKm,
//       startGatePassId: args.startGatePassId,
//       startTimestamp: Date.now(),
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       routeId: args.routeId,
//       approved: false,
//     });
//   },
// });

// export const endTrip = mutation({
//   args: {
//     tripId: v.id("trips"),
//     endKm: v.number(),
//     endGatePassId: v.id("_storage"),
//     ratePerKm: v.number(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const appUser = await ctx.db
//       .query("app_users")
//       .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
//       .unique();
//     if (!appUser) {
//       throw new Error("Unauthorized");
//     }

//     const trip = await ctx.db.get(args.tripId);
//     if (
//       !trip ||
//       trip.driverId !== appUser._id ||
//       trip.status !== "InProgress"
//     ) {
//       throw new Error("Trip not found or not in progress.");
//     }

//     const distance = args.endKm - (trip.startKm ?? 0); // ! Check this
//     const virtualAmount = distance * args.ratePerKm;

//     await ctx.db.patch(args.tripId, {
//       status: "Completed",
//       endKm: args.endKm,
//       endGatePassId: args.endGatePassId,
//       endTimestamp: Date.now(),
//       virtualAmount: virtualAmount,
//       ratePerKm: args.ratePerKm,
//       updatedAt: Date.now(),
//     });
//   },
// });

// export const approveTrip = mutation({
//   args: {
//     tripId: v.id("trips"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const adminUser = await ctx.db
//       .query("app_users")
//       .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
//       .unique();

//     if (!adminUser) {
//       throw new Error("Unauthorized");
//     }

//     const trip = await ctx.db.get(args.tripId);
//     if (!trip || trip.status !== "Completed" || trip.approved) {
//       throw new Error("Trip cannot be approved.");
//     }

//     const driver = await ctx.db.get(trip.driverId);
//     if (!driver) {
//       throw new Error("Driver not found");
//     }

//     await ctx.db.patch(driver._id, {
//       balance: (driver.balance || 0) + (trip?.virtualAmount ?? 0), // ! Check this logic
//     });

//     await ctx.db.patch(args.tripId, {
//       approved: true,
//       approvedBy: adminUser._id,
//       approvedAt: Date.now(),
//     });
//   },
// });

// export const getTripDataForReport = query({
//   args: {
//     companyId: v.id("companies"),
//     startDate: v.optional(v.number()),
//     endDate: v.optional(v.number()),
//     driverId: v.optional(v.id("app_users")),
//   },
//   handler: async (ctx, args) => {
//     let q = ctx.db.query("trips").withIndex("by_company", (q) => q.eq("companyId", args.companyId));
    
//     // Check if startDate is defined before filtering
//     if (args.startDate !== undefined) {
//       q = q.filter((q) => q.gt(q.field("createdAt"), args.startDate as number));
//     }
    
//     // Check if endDate is defined before filtering
//     if (args.endDate !== undefined) {
//       q = q.filter((q) => q.lt(q.field("createdAt"), args.endDate as number));
//     }
    
//     // Check if driverId is defined before filtering
//     if (args.driverId !== undefined) {
//       q = q.filter((q) => q.eq(q.field("driverId"), args.driverId));
//     }
    
//     return await q.collect();
//   },
// });
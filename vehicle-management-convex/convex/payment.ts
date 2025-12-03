// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const logManualPayment = mutation({
//   args: {
//     userId: v.id("app_users"),
//     amount: v.number(),
//     screenshotId: v.optional(v.id("_storage")),
//     note: v.optional(v.string()),
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

//     const driver = await ctx.db.get(args.userId);
//     if (!driver) {
//       throw new Error("Driver not found");
//     }

//     // Create a debit transaction (negative amount)
//     await ctx.db.insert("payments", {
//       userId: args.userId,
//       amount: -args.amount,
//       screenshotId: args.screenshotId,
//       method: "manual",
//       note: args.note,
//       createdAt: Date.now(),
//       byUserId: adminUser._id,
//       byRole: "admin",
//     });

//     // Update the driver's balance
//     await ctx.db.patch(driver._id, {
//       balance: (driver.balance || 0) - args.amount,
//     });
//   },
// });

// export const makePaymentToDriver = mutation({
//   args: {
//     userId: v.id("app_users"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }
//     const superUser = await ctx.db
//       .query("app_users")
//       .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
//       .unique();

//     if (!superUser) {
//       throw new Error("Unauthorized");
//     }

//     const driver = await ctx.db.get(args.userId);
//     if (!driver) {
//       throw new Error("Driver not found");
//     }

//     const amount = driver.balance || 0;
//     if (amount <= 0) {
//       throw new Error("No balance to pay.");
//     }

//     // Create a payout transaction (positive amount)
//     await ctx.db.insert("payments", {
//       userId: args.userId,
//       amount: amount,
//       method: "bulk", // Or 'external' etc.
//       note: "Super user payout",
//       createdAt: Date.now(),
//       byUserId: superUser._id,
//       byRole: "super",
//     });

//     // Reset the driver's balance
//     await ctx.db.patch(driver._id, {
//       balance: 0,
//     });
//   },
// });
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isAdmin, isSuper } from "./utils";

// List bank details for the authenticated user (or another user if caller is admin/super)
export const listUserBankDetails = query({
  args: { appUserId: v.optional(v.id("app_users")) },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    const targetUserId = args.appUserId || appUser._id;

    // If requesting another user's details, require admin/super
    if (args.appUserId && String(args.appUserId) !== String(appUser._id)) {
      const roleDocs = await ctx.db
        .query("userRoles")
        .withIndex("by_user_id", (q) => q.eq("userId", appUser._id))
        .collect();
      if (!(isAdmin(roleDocs) || isSuper(roleDocs))) {
        throw new Error("Unauthorized");
      }
    }

    const rows = await ctx.db
      .query("user_bank_details")
      .withIndex("by_user_id", (q) => q.eq("userId", targetUserId))
      .order("desc")
      .collect();

    return rows;
  },
});

// Mutation to submit bank details for the authenticated user (or another user if caller is admin/super)
export const submitUserBankDetails = mutation({
  args: {
    userId: v.optional(v.id("app_users")),
    account_number: v.string(),
    account_holder_name: v.string(),
    ifsc_code: v.string(),
    branch_name: v.string(),
    branch_address: v.string(),
    branch_city: v.string(),
    branch_pincode: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result || !result.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    const targetUserId = args.userId || appUser._id;

    // If submitting for another user, require admin/super
    if (args.userId && String(args.userId) !== String(appUser._id)) {
      const roleDocs = await ctx.db
        .query("userRoles")
        .withIndex("by_user_id", (q) => q.eq("userId", appUser._id))
        .collect();
      if (!(isAdmin(roleDocs) || isSuper(roleDocs))) {
        throw new Error("Unauthorized");
      }
    }

    const targetUser = await ctx.db.get(targetUserId);
    if (!targetUser) throw new Error("Target user not found");

    const id = await ctx.db.insert("user_bank_details", {
      userId: targetUserId,
      account_number: args.account_number,
      account_holder_name: args.account_holder_name,
      ifsc_code: args.ifsc_code,
      branch_name: args.branch_name,
      branch_address: args.branch_address,
      branch_city: args.branch_city,
      branch_pincode: args.branch_pincode,
    });

    return { id };
  },
});

// Mutation to update an existing bank details record (only owner or admin/super)
export const updateUserBankDetails = mutation({
  args: {
    id: v.id("user_bank_details"),
    account_number: v.optional(v.string()),
    account_holder_name: v.optional(v.string()),
    ifsc_code: v.optional(v.string()),
    branch_name: v.optional(v.string()),
    branch_address: v.optional(v.string()),
    branch_city: v.optional(v.string()),
    branch_pincode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result || !result.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Bank details not found");

    // Only owner or admin/super can update
    const isOwner = String(existing.userId) === String(appUser._id);
    if (!isOwner) {
      const roleDocs = await ctx.db
        .query("userRoles")
        .withIndex("by_user_id", (q) => q.eq("userId", appUser._id))
        .collect();
      if (!(isAdmin(roleDocs) || isSuper(roleDocs))) {
        throw new Error("Unauthorized");
      }
    }

    const patch: Record<string, any> = {};
    if (args.account_number !== undefined) patch.account_number = args.account_number;
    if (args.account_holder_name !== undefined)
      patch.account_holder_name = args.account_holder_name;
    if (args.ifsc_code !== undefined) patch.ifsc_code = args.ifsc_code;
    if (args.branch_name !== undefined) patch.branch_name = args.branch_name;
    if (args.branch_address !== undefined) patch.branch_address = args.branch_address;
    if (args.branch_city !== undefined) patch.branch_city = args.branch_city;
    if (args.branch_pincode !== undefined) patch.branch_pincode = args.branch_pincode;

    await ctx.db.patch(args.id, patch);

    return { ok: true };
  },
});

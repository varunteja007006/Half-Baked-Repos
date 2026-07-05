import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isSuper } from "./utils";

export const getAuditOperations = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");
    const callerIsSuper = isSuper(caller.userRoles);
    if (!callerIsSuper) throw new Error("Only super administrators can view audit operations");

    return await ctx.db.query("audit_operations").collect();
  },
});

export const createAuditOperation = mutation({
  args: { code: v.string(), name: v.string(), description: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");
    const callerIsSuper = isSuper(caller.userRoles);
    if (!callerIsSuper) throw new Error("Only super administrators can create audit operations");

    const now = Date.now();
    const existing = await ctx.db
      .query("audit_operations")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    if (existing) throw new Error("Operation code already exists");

    const id = await ctx.db.insert("audit_operations", {
      code: args.code,
      name: args.name,
      description: args.description ?? undefined,
      isActive: true,
      createdAt: now,
      createdBy: caller.appUser._id,
    });

    return { id };
  },
});

export const updateAuditOperation = mutation({
  args: {
    id: v.id("audit_operations"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");
    const callerIsSuper = isSuper(caller.userRoles);
    if (!callerIsSuper) throw new Error("Only super administrators can update audit operations");

    const now = Date.now();
    await ctx.db.patch(args.id, {
      name: args.name as any,
      description: args.description as any,
      isActive: args.isActive as any,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { ok: true };
  },
});

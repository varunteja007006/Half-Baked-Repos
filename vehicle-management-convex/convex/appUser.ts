import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isAdmin, isSuper, isDriver } from "./utils";

// Admin query: returns all app_users together with their base `users` doc (if any)
// and the list of roles associated with each app_user. Access restricted to
// callers who have either `admin` or `super` roles.
export const adminListUsers = query({
  args: {
    onlyActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

  if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    let appUsersQuery = ctx.db.query("app_users");
    if (args.onlyActive === true) {
      appUsersQuery = appUsersQuery.filter((q) => q.eq(q.field("isActive"), true));
    }

    // Fetch app users and attach their roles and base `users` doc
    const appUsers = await appUsersQuery.collect();

    const out = await Promise.all(
      appUsers.map(async (au) => {
        const roles = await ctx.db
          .query("userRoles")
          .withIndex("by_user_id", (q) => q.eq("userId", au._id))
          .collect();

        const user = au.userId ? await ctx.db.get(au.userId) : null;

        return { appUser: au, user, roles };
      }),
    );

    return out;
  },
});

// Admin query: returns a single app_user with their base `users` doc (if any)
// and the list of roles associated with the user. Access restricted to
// callers who have either `admin` or `super` roles.
export const adminGetUser = query({
  args: {
    appUserId: v.id("app_users"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    // Fetch the specific app user
    const appUser = await ctx.db.get(args.appUserId);
    if (!appUser) {
      throw new Error("User not found");
    }

    // Get roles for this user
    const userRoles = await ctx.db
      .query("userRoles")
      .withIndex("by_user_id", (q) => q.eq("userId", appUser._id))
      .collect();

    // Get the base user doc if it exists
    const user = appUser.userId ? await ctx.db.get(appUser.userId) : null;

    const isAdminUser = isAdmin(userRoles);
    const isSuperUser = isSuper(userRoles);
    const isDriverUser = isDriver(userRoles);

    return { appUser, user, userRoles, isAdminUser, isSuperUser, isDriverUser };
  },
});

// Simple mutation to update only the authenticated user's name field
export const updateUserName = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const result = await getAppUserFromUserId(ctx);
    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }

    const { appUser } = result;

    // Patch the appUser record's name field
    await ctx.db.patch(appUser._id, { name: args.name });

    return { success: true, message: "Name updated" };
  },
});

// Mutation: add or update roles for a given app_user.
// Only callers with `admin` or `super` roles may perform this action.
export const upsertUserRoles = mutation({
  args: {
    targetAppUserId: v.id("app_users"),
    roles: v.array(v.union(v.literal("driver"), v.literal("admin"), v.literal("super"))),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can update roles
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const targetId = args.targetAppUserId;

    // Verify target exists
    const target = await ctx.db.get(targetId);
    if (!target) {
      throw new Error("Target user not found");
    }

    const now = Date.now();

    // Fetch existing roles for the target
    const existing = await ctx.db
      .query("userRoles")
      .withIndex("by_user_id", (q) => q.eq("userId", targetId))
      .collect();

    // Delete existing role docs (soft delete vs hard: schema supports isActive; we'll remove rows)
    for (const r of existing) {
      await ctx.db.delete(r._id);
    }

    // Insert new roles
    for (const role of args.roles) {
      await ctx.db.insert("userRoles", {
        userId: targetId,
        role,
        createdAt: now,
        createdBy: caller.appUser._id,
        isActive: true,
      });
    }

    return { success: true, message: "Roles updated" };
  },
});

// Mutation: soft delete an app_user by setting deletedAt and deletedBy fields.
// Only callers with `admin` or `super` roles may perform this action.
export const softDeleteUser = mutation({
  args: {
    targetAppUserId: v.id("app_users"),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can delete users
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const targetId = args.targetAppUserId;

    // Verify target exists and is not already deleted
    const target = await ctx.db.get(targetId);
    if (!target) {
      throw new Error("Target user not found");
    }

    if (target.deletedAt) {
      throw new Error("User is already deleted");
    }

    // Prevent self-deletion
    if (targetId === caller.appUser._id) {
      throw new Error("Cannot delete your own account");
    }

    const now = Date.now();

    // Soft delete the user by setting deletedAt and deletedBy
    await ctx.db.patch(targetId, {
      deletedAt: now,
      deletedBy: caller.appUser._id,
      isActive: false,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    // Soft delete all associated user roles
    const userRoles = await ctx.db
      .query("userRoles")
      .withIndex("by_user_id", (q) => q.eq("userId", targetId))
      .collect();

    for (const role of userRoles) {
      await ctx.db.patch(role._id, {
        deletedAt: now,
        deletedBy: caller.appUser._id,
        isActive: false,
        updatedAt: now,
        updatedBy: caller.appUser._id,
      });
    }

    return { success: true, message: "User deleted successfully" };
  },
});

// NOTE: createBaseUser removed. createAppUser will create the base `users` row
// when a `userId` is not supplied so that `app_users.userId` is always set.

// New mutation: create an app_user (appUser) and optionally add roles.
// Fields added to app_user: phoneNumber, whatsappNumber, aadhar, pan, bloodGroup.
// Only admin/super may perform this.
export const createAppUser = mutation({
  args: {
    userId: v.optional(v.id("users")),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    whatsappNumber: v.optional(v.string()),
    aadhar: v.optional(v.string()),
    pan: v.optional(v.string()),
    bloodGroup: v.optional(v.string()),
    roles: v.optional(v.array(v.union(v.literal("driver"), v.literal("admin"), v.literal("super")))),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }
    // If a userId is provided, ensure it exists; otherwise create a base `users` row
    let finalUserId = args.userId;
    if (finalUserId) {
      const baseUser = await ctx.db.get(finalUserId);
      if (!baseUser) {
        throw new Error("Provided base user not found");
      }
    } else {
      // Create the base `users` doc with only allowed auth fields
      finalUserId = await ctx.db.insert("users", {
        email: args.email ?? undefined,
        name: args.name ?? undefined,
        phone: args.phoneNumber ?? undefined,
      });
    }

    const now = Date.now();

    const appUserId = await ctx.db.insert("app_users", {
      userId: finalUserId,
      name: args.name ?? undefined,
      email: args.email ?? undefined,
      phoneNumber: args.phoneNumber ?? undefined,
      whatsappNumber: args.whatsappNumber ?? undefined,
      aadhar: args.aadhar ?? undefined,
      pan: args.pan ?? undefined,
      bloodGroup: args.bloodGroup ?? undefined,
      createdAt: now,
      createdBy: caller.appUser._id,
      isActive: true,
    });

    // Insert roles if provided
    if (args.roles && args.roles.length > 0) {
      for (const role of args.roles) {
        await ctx.db.insert("userRoles", {
          userId: appUserId,
          role,
          createdAt: now,
          createdBy: caller.appUser._id,
          isActive: true,
        });
      }
    }

    return { success: true, appUserId };
  },
});

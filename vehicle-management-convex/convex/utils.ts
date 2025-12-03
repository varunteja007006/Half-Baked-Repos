import { getAuthUserId } from "@convex-dev/auth/server";
import { query, QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

// Role type derived from the generated data model for `userRoles` table
export type Role = Doc<"userRoles">["role"];

export async function getAppUserFromUserId(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    return null;
  }
  // app_users doc
  const appUser = await ctx.db
    .query("app_users")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first();
  if (!appUser) {
    return null;
  }
  // base user doc (if exists)
  const user = await ctx.db.get(userId);
  // user roles (may be multiple)
  const userRoles = await ctx.db
    .query("userRoles")
    .withIndex("by_user_id", (q) => q.eq("userId", appUser._id))
    .collect();
  return { appUser, user, userRoles };
}

export const getAppUserFromUserIdQuery = query({
  args: {}, // Takes no arguments, as it relies on auth context
  handler: async (ctx) => {
    // Note: The logic inside the handler is exactly what you provided.
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    // app_users doc
    const appUser = await ctx.db
      .query("app_users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!appUser) {
      return null;
    }

    // base user doc (if exists)
    // Note: Assuming 'userId' is an Id<"users"> or similar for the base user table
    const user = await ctx.db.get(userId as Id<"users">);

    // user roles (may be multiple)
    const userRoles = await ctx.db
      .query("userRoles")
      .withIndex("by_user_id", (q) => q.eq("userId", appUser._id))
      .collect();

    return { appUser, user, userRoles };
  },
});

// Role helper utilities. These functions accept the `userRoles` array
// produced by `getAppUserFromUserId` and return booleans.
export function hasRole(
  userRoles: Array<Doc<"userRoles">> | undefined,
  role: Role | string,
): boolean {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  return userRoles.some(
    (r) =>
      r && (r.role as string) === String(role) && (r.isActive === undefined || r.isActive === true),
  );
}

export function hasAnyRole(
  userRoles: Array<Doc<"userRoles">> | undefined,
  roles: Array<Role | string>,
): boolean {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  return roles.some((role) => hasRole(userRoles, role));
}

export function isAdmin(userRoles: Array<Doc<"userRoles">> | undefined): boolean {
  return hasRole(userRoles, "admin");
}

export function isSuper(userRoles: Array<Doc<"userRoles">> | undefined): boolean {
  return hasRole(userRoles, "super");
}

export function isDriver(userRoles: Array<Doc<"userRoles">> | undefined): boolean {
  return hasRole(userRoles, "driver");
}

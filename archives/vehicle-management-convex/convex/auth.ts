import Google from "@auth/core/providers/google";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, query } from "./_generated/server";
import { isAdmin, isDriver, isSuper } from "./utils";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx: MutationCtx, { userId, profile }) {
      //check before insert'
      const existingUser = await ctx.db
        .query("app_users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .first();

      if (existingUser) {
        // for now do nothing
      } else {
        await ctx.db.insert("app_users", {
          userId,
          createdAt: Date.now(),
          email: profile.email,
        });
      }
    },
  },
});

// Query to get the logged-in user's app_user document (unified)
export const loggedInUser = query({
  handler: async (ctx) => {
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

    const isAdminUser = isAdmin(userRoles);
    const isSuperUser = isSuper(userRoles);
    const isDriverUser = isDriver(userRoles);
    
    return { appUser, user, userRoles, isAdminUser, isSuperUser, isDriverUser };
  },
});

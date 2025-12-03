import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { getAppUserFromUserId, isAdmin, isSuper } from "./utils";

// Create an export record for trip_v1 - stores the filters used and the storage id
// where the generated XLSX/CSV is uploaded. This can be shared with other users.
export const createTripV1Export = internalMutation({
  args: {
    companyId: v.optional(v.id("companies")),
    driverId: v.optional(v.id("app_users")),
    routeId: v.optional(v.id("routes")),
    routeTypeId: v.optional(v.id("route_types")),
    typeId: v.optional(v.id("trip_types")),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),

    // file metadata (the front-end should upload to Convex _storage and provide id)
    storageId: v.id("_storage"),
    filename: v.optional(v.string()),
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),

    // Sharing
    sharedWith: v.optional(v.array(v.id("app_users"))),
    name: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();

    const id = await ctx.db.insert("trip_exports", {
      companyId: args.companyId ?? undefined,
      driverId: args.driverId ?? undefined,
      routeId: args.routeId ?? undefined,
      routeTypeId: args.routeTypeId ?? undefined,
      typeId: args.typeId ?? undefined,
      startDate: args.startDate ?? undefined,
      endDate: args.endDate ?? undefined,
      limit: args.limit ?? undefined,

      storageId: args.storageId,
      filename: args.filename ?? undefined,
      contentType: args.contentType ?? undefined,
      size: args.size ?? undefined,

      sharedWith: args.sharedWith ?? undefined,
      name: args.name ?? undefined,
      notes: args.notes ?? undefined,

      createdAt: now,
      createdBy: caller.appUser._id,
      isActive: true,
    });

    return { success: true, id };
  },
});

// List exports visible to the current user (owned or sharedWith)
export const listTripExportsForUser = query({
  args: { companyId: v.optional(v.id("companies")) },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");

    const rows = await ctx.db.query("trip_exports").collect();

    const visible = rows.filter((r) => {
      if (!r?.isActive) return false;
      if (args.companyId && r.companyId && String(r.companyId) !== String(args.companyId))
        return false;
      if (r.createdBy === caller.appUser._id) return true;
      if (
        Array.isArray(r.sharedWith) &&
        r.sharedWith.some((id) => String(id) === String(caller.appUser._id))
      )
        return true;
      return false;
    });

    // Attach signed download URLs where possible
    const withUrls = await Promise.all(
      visible.map(async (r) => {
        let downloadUrl: string | null = null;
        try {
          downloadUrl = await ctx.storage.getUrl(r.storageId);
        } catch (e) {
          console.error("Failed to get download URL for trip_exports", e);
          downloadUrl = null;
        }
        return { ...r, downloadUrl };
      }),
    );

    return withUrls;
  },
});

// Get a single export record (only if visible to caller)
export const getTripExport = query({
  args: { id: v.id("trip_exports") },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");

    const rec = await ctx.db.get(args.id);
    if (!rec?.isActive) throw new Error("Not found");

    const isOwner = String(rec.createdBy) === String(caller.appUser._id);
    const isShared = Array.isArray(rec.sharedWith)
      ? rec.sharedWith.some((id) => String(id) === String(caller.appUser._id))
      : false;
    const callerIsSuper = isSuper(caller.userRoles);

    if (!isOwner && !isShared && !callerIsSuper)
      throw new Error("Not authorized to view this export");

    let downloadUrl: string | null = null;
    try {
      downloadUrl = await ctx.storage.getUrl(rec.storageId);
    } catch (e) {
      console.error("Failed to get download URL for trip export", e);
      downloadUrl = null;
    }

    return { ...rec, downloadUrl };
  },
});

// Soft-delete/unshare an export (owner or admin/super)
export const deleteTripExport = mutation({
  args: { id: v.id("trip_exports") },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");

    const rec = await ctx.db.get(args.id);
    if (!rec) throw new Error("Export not found");

    const isOwner = String(rec.createdBy) === String(caller.appUser._id);
    const isAdminOrSuper = isAdmin(caller.userRoles) || isSuper(caller.userRoles);

    if (!isOwner && !isAdminOrSuper) throw new Error("Not authorized to delete this export");

    const now = Date.now();
    await ctx.db.patch(args.id, {
      isActive: false,
      deletedAt: now,
      deletedBy: caller.appUser._id,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { success: true };
  },
});

// Update sharing list for an export (owner or admin/super)
export const updateTripExportSharing = mutation({
  args: { id: v.id("trip_exports"), sharedWith: v.optional(v.array(v.id("app_users"))) },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const rec = await ctx.db.get(args.id);
    if (!rec) throw new Error("Export not found");

    const isOwner = String(rec.createdBy) === String(caller.appUser._id);
    const isAdminOrSuper = isAdmin(caller.userRoles) || isSuper(caller.userRoles);
    if (!isOwner && !isAdminOrSuper) throw new Error("Not authorized to change sharing");

    const now = Date.now();
    await ctx.db.patch(args.id, {
      sharedWith: args.sharedWith ?? undefined,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { success: true };
  },
});

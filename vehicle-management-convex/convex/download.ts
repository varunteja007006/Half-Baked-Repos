import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isSuper } from "./utils";

// Download user documents (owners or super)
export const downloadUserDocumentsWithAudit = mutation({
  args: { documentIds: v.array(v.id("user_docs")), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");

    const performedBy = caller.appUser._id;
    const now = Date.now();

    const fileStorageIds: Array<any> = [];
    const fileDetails: Array<any> = [];

    for (const documentId of args.documentIds) {
      const doc = await ctx.db.get(documentId);
      if (!doc) throw new Error(`Document ${documentId} not found`);

      const isOwner = (doc as any).userId === caller.appUser._id;
      const callerIsSuper = isSuper(caller.userRoles);
      if (!isOwner && !callerIsSuper) {
        throw new Error("You don't have permission to download this user document");
      }

      if ((doc as any).fileId) {
        fileStorageIds.push((doc as any).fileId);
        const fileMeta = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", (doc as any).fileId))
          .first();
        fileDetails.push({ documentId, fileMeta });
      }
    }

    const urls = await Promise.all(
      fileStorageIds.map(async (storageId) => {
        try {
          return { storageId, url: await ctx.storage.getUrl(storageId) };
        } catch (e) {
          return { storageId, url: null, error: String(e) };
        }
      }),
    );

    const op = await ctx.db
      .query("audit_operations")
      .withIndex("by_code", (q) => q.eq("code", "download_user_file"))
      .first();

    const auditOpId = op ? op._id : undefined;

    await ctx.db.insert("audit_logs", {
      operationCode: "download_user_file",
      operationId: auditOpId,
      performedBy,
      performedAt: now,
      targetTable: "user_docs",
      targetRecordIds: args.documentIds as any,
      fileStorageIds,
      fileDetails,
      notes: args.reason ?? undefined,
      createdAt: now,
      createdBy: performedBy,
      isActive: true,
    });

    return { urls };
  },
});

// Download vehicle documents (only super in this implementation)
export const downloadVehicleDocumentsWithAudit = mutation({
  args: { documentIds: v.array(v.id("vehicle_docs")), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) throw new Error("Not authenticated");

    const callerIsSuper = isSuper(caller.userRoles);
    if (!callerIsSuper) throw new Error("Only super administrators can download vehicle documents");

    const performedBy = caller.appUser._id;
    const now = Date.now();

    const fileStorageIds: Array<any> = [];
    const fileDetails: Array<any> = [];

    for (const documentId of args.documentIds) {
      const doc = await ctx.db.get(documentId);
      if (!doc) throw new Error(`Document ${documentId} not found`);

      if ((doc as any).fileId) {
        fileStorageIds.push((doc as any).fileId);
        const fileMeta = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", (doc as any).fileId))
          .first();
        fileDetails.push({ documentId, fileMeta });
      }
    }

    const urls = await Promise.all(
      fileStorageIds.map(async (storageId) => {
        try {
          return { storageId, url: await ctx.storage.getUrl(storageId) };
        } catch (e) {
          return { storageId, url: null, error: String(e) };
        }
      }),
    );

    const op = await ctx.db
      .query("audit_operations")
      .withIndex("by_code", (q) => q.eq("code", "download_vehicle_file"))
      .first();

    const auditOpId = op ? op._id : undefined;

    await ctx.db.insert("audit_logs", {
      operationCode: "download_vehicle_file",
      operationId: auditOpId,
      performedBy,
      performedAt: now,
      targetTable: "vehicle_docs",
      targetRecordIds: args.documentIds as any,
      fileStorageIds,
      fileDetails,
      notes: args.reason ?? undefined,
      createdAt: now,
      createdBy: performedBy,
      isActive: true,
    });

    return { urls };
  },
});

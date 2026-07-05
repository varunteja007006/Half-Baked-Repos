import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId } from "./utils";

// List all user documents for a given userId
export const listUserDocuments = query({
  args: { appUserId: v.optional(v.id("app_users")) },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    const docs = await ctx.db
      .query("user_docs")
      .withIndex("by_user", (q) => q.eq("userId", args.appUserId || appUser._id))
      .collect();

    const docsWithUrls = await Promise.all(
      docs.map(async (doc) => {
        let fileUrl: string | null = null;
        let fileName: string | null = null;
        let contentType: string | null = null;
        try {
          if (doc.fileId) {
            // ctx.storage.getUrl accepts the storage id and returns a signed URL
            fileUrl = await ctx.storage.getUrl(doc.fileId);
            try {
              const metadata = await ctx.db.system.get(doc.fileId as any);
              if (metadata) {
                // Some systems may include a name; prefer it, otherwise fallback to kind or id string
                fileName = (metadata as any).name ?? (doc.kind || null) ?? String(doc.fileId);
                contentType = (metadata as any).contentType ?? null;
              } else {
                fileName = doc.kind || String(doc.fileId);
              }
            } catch (e) {
              // If system.get fails, still provide a fallback filename
              fileName = doc.kind || String(doc.fileId);
              console.error(e);
            }
          }
        } catch (err) {
          // If getting the URL/metadata fails, return nulls so the client can handle it.
          fileUrl = null;
          fileName = null;
          contentType = null;
          console.error(err);
        }
        return { ...doc, fileUrl, fileName, contentType };
      }),
    );

    return docsWithUrls;
  },
});

// Query to get a specific document by ID (for deletion verification)
export const getUserDocument = query({
  args: { documentId: v.id("user_docs") },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser, userRoles } = result;

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    // Check if user has permission to view this document
    const isOwner = document.userId === appUser._id;
    const isSuper = userRoles?.some(
      (role) => role.role === "super" && (role.isActive === undefined || role.isActive === true),
    );

    if (!isOwner && !isSuper) {
      throw new Error("You don't have permission to view this document");
    }

    return document;
  },
});

// Query to check if user can delete specific documents
export const canDeleteDocuments = query({
  args: { documentIds: v.array(v.id("user_docs")) },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser, userRoles } = result;

    const isSuper = userRoles?.some(
      (role) => role.role === "super" && (role.isActive === undefined || role.isActive === true),
    );

    const permissions = await Promise.all(
      args.documentIds.map(async (documentId) => {
        const document = await ctx.db.get(documentId);

        if (!document) {
          return { documentId, canDelete: false, reason: "Document not found" };
        }

        const isOwner = document.userId === appUser._id;

        if (isSuper || isOwner) {
          return { documentId, canDelete: true, reason: null };
        }

        return { documentId, canDelete: false, reason: "No permission" };
      }),
    );

    return {
      canDeleteAll: permissions.every((p) => p.canDelete),
      permissions,
      userRole: isSuper ? "super" : "user",
    };
  },
});

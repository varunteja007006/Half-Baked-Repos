import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { UserDocKind } from "./schema";
import { getAppUserFromUserId, isSuper } from "./utils";

// Generate a signed URL for uploading a document
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Mutation to handle user document upload
export const submitUserDocuments = mutation({
  args: {
    userId: v.optional(v.id("app_users")),
    docs: v.array(
      v.object({
        kind: UserDocKind,
        fileId: v.id("_storage"),
        expiry: v.optional(v.number()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser } = result;

    const targetUserId = args.userId || appUser._id;

    // Check for existing documents of the same kind for this user
    const duplicateChecks = await Promise.all(
      args.docs.map(async (doc) => {
        const existingDoc = await ctx.db
          .query("user_docs")
          .withIndex("by_user_kind", (q) => 
            q.eq("userId", targetUserId).eq("kind", doc.kind)
          )
          .filter((q) => q.eq(q.field("isActive"), true))
          .first();
        
        return {
          kind: doc.kind,
          exists: !!existingDoc,
          existingDocId: existingDoc?._id,
        };
      })
    );

    // Check if any documents already exist
    const duplicates = duplicateChecks.filter(check => check.exists);
    if (duplicates.length > 0) {
      const duplicateKinds = duplicates.map(d => d.kind).join(", ");
      throw new Error(`Document(s) already exist for this user: ${duplicateKinds}. Please delete the existing document(s) before uploading new ones.`);
    }

    const now = Date.now();
    const ids = [];
    for (const doc of args.docs) {
      const id = await ctx.db.insert("user_docs", {
        userId: targetUserId,
        kind: doc.kind,
        fileId: doc.fileId,
        expiry: doc.expiry,
        approvalStatus: "pending", // Set default approval status
        createdAt: now,
        createdBy: appUser._id,
        isActive: true,
      });
      ids.push(id);
    }
    return { ids };
  },
});

// Mutation to delete user documents (single or multiple)
export const deleteUserDocuments = mutation({
  args: {
    documentIds: v.array(v.id("user_docs")),
  },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { appUser, userRoles } = result;

    // Check if user is super admin
    const isSuperUser = isSuper(userRoles);

    const now = Date.now();
    const deletedIds = [];

    for (const documentId of args.documentIds) {
      // Get the document to check ownership
      const document = await ctx.db.get(documentId);
      
      if (!document) {
        throw new Error(`Document with ID ${documentId} not found`);
      }

      // Check if user has permission to delete this document
      const isOwner = document.userId === appUser._id;
      
      if (!isSuperUser && !isOwner) {
        throw new Error(`You don't have permission to delete document ${documentId}`);
      }

      // Hard delete: remove the document record and associated storage file
      if (document.fileId) {
        try {
          await ctx.storage.delete(document.fileId);
        } catch (error) {
          console.warn(`Failed to delete file ${document.fileId} from storage:`, error);
          // Continue with document deletion even if file deletion fails
        }
      }
  
      await ctx.db.delete(documentId);
      deletedIds.push(documentId);
    }

    return {
      deletedIds,
      count: deletedIds.length,
      message: `Permanently deleted ${deletedIds.length} document(s)`,
    };
  },
});

// Mutation to permanently delete user documents (only super admin)
export const permanentlyDeleteUserDocuments = mutation({
  args: {
    documentIds: v.array(v.id("user_docs")),
  },
  handler: async (ctx, args) => {
    const result = await getAppUserFromUserId(ctx);

    if (!result?.appUser) {
      throw new Error("Not authenticated");
    }
    const { userRoles } = result;

    // Only super admin can permanently delete documents
    const isSuperUser = isSuper(userRoles);
    if (!isSuperUser) {
      throw new Error("Only super administrators can permanently delete documents");
    }

    const deletedIds = [];

    for (const documentId of args.documentIds) {
      // Get the document to verify it exists
      const document = await ctx.db.get(documentId);
      
      if (!document) {
        throw new Error(`Document with ID ${documentId} not found`);
      }

      // Delete the file from storage if it exists
      if (document.fileId) {
        try {
          await ctx.storage.delete(document.fileId);
        } catch (error) {
          console.warn(`Failed to delete file ${document.fileId} from storage:`, error);
          // Continue with document deletion even if file deletion fails
        }
      }

      // Permanently delete the document record
      await ctx.db.delete(documentId);
      deletedIds.push(documentId);
    }

    return { 
      deletedIds,
      count: deletedIds.length,
      message: `Permanently deleted ${deletedIds.length} document(s)`,
    };
  },
});

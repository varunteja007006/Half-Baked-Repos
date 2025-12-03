import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isAdmin, isSuper } from "./utils";

// Define approval status enum
const ApprovalStatus = v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"));

// Mutation: Approve/Reject User Documents
export const approveUserDocuments = mutation({
  args: {
    documentIds: v.array(v.id("user_docs")),
    status: ApprovalStatus,
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can approve/reject documents
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to approve documents");
    }

    const now = Date.now();
    const results = [];

    for (const documentId of args.documentIds) {
      const document = await ctx.db.get(documentId);
      if (!document) {
        results.push({ id: documentId, success: false, error: "Document not found" });
        continue;
      }

      if (!document.isActive) {
        results.push({ id: documentId, success: false, error: "Document is not active" });
        continue;
      }

      await ctx.db.patch(documentId, {
        approvalStatus: args.status,
        approvedBy: caller.appUser._id,
        approvedAt: now,
        approvalNotes: args.notes,
        updatedAt: now,
        updatedBy: caller.appUser._id,
      });

      results.push({ id: documentId, success: true });
    }

    return {
      success: true,
      message: `${args.status === "approved" ? "Approved" : "Rejected"} ${
        results.filter((r) => r.success).length
      } document(s)`,
      results,
    };
  },
});

// Mutation: Approve/Reject Vehicle Documents
export const approveVehicleDocuments = mutation({
  args: {
    documentIds: v.array(v.id("vehicle_docs")),
    status: ApprovalStatus,
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can approve/reject documents
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to approve documents");
    }

    const now = Date.now();
    const results = [];

    for (const documentId of args.documentIds) {
      const document = await ctx.db.get(documentId);
      if (!document) {
        results.push({ id: documentId, success: false, error: "Document not found" });
        continue;
      }

      if (!document.isActive) {
        results.push({ id: documentId, success: false, error: "Document is not active" });
        continue;
      }

      await ctx.db.patch(documentId, {
        approvalStatus: args.status,
        approvedBy: caller.appUser._id,
        approvedAt: now,
        approvalNotes: args.notes,
        updatedAt: now,
        updatedBy: caller.appUser._id,
      });

      results.push({ id: documentId, success: true });
    }

    return {
      success: true,
      message: `${args.status === "approved" ? "Approved" : "Rejected"} ${
        results.filter((r) => r.success).length
      } document(s)`,
      results,
    };
  },
});

// Query: Get all pending user documents for approval
export const getPendingUserDocuments = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can view pending documents
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to view pending documents");
    }

    const limit = args.limit || 50;

    const pendingDocs = await ctx.db
      .query("user_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "pending"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(limit);

    // Get user details for each document
    const docsWithUserDetails = await Promise.all(
      pendingDocs.map(async (doc) => {
        const user = await ctx.db.get(doc.userId);
        const file = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", doc.fileId))
          .first();

        return {
          ...doc,
          user,
          file,
          downloadUrl: await ctx.storage.getUrl(doc.fileId),
        };
      }),
    );

    return docsWithUserDetails;
  },
});

// Query: Get all pending vehicle documents for approval
export const getPendingVehicleDocuments = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can view pending documents
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to view pending documents");
    }

    const limit = args.limit || 50;

    const pendingDocs = await ctx.db
      .query("vehicle_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "pending"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(limit);

    // Get vehicle details for each document
    const docsWithVehicleDetails = await Promise.all(
      pendingDocs.map(async (doc) => {
        const vehicle = await ctx.db.get(doc.vehicleId);
        const file = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", doc.fileId))
          .first();

        return {
          ...doc,
          vehicle,
          file,
          downloadUrl: await ctx.storage.getUrl(doc.fileId),
        };
      }),
    );

    return docsWithVehicleDetails;
  },
});

// Query: Get all documents with their approval status (for admin dashboard)
export const getAllUserDocumentsWithApprovalStatus = query({
  args: {
    status: v.optional(ApprovalStatus),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can view all documents
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to view all documents");
    }

    const limit = args.limit || 100;

    let docs;

    if (args.status) {
      docs = await ctx.db
        .query("user_docs")
        .withIndex("by_approval_status", (q) => q.eq("approvalStatus", args.status))
        .filter((q) => q.eq(q.field("isActive"), true))
        .order("desc")
        .take(limit);
    } else {
      docs = await ctx.db
        .query("user_docs")
        .filter((q) => q.eq(q.field("isActive"), true))
        .order("desc")
        .take(limit);
    }

    const docsWithUserDetails = await Promise.all(
      docs.map(async (doc) => {
        const user = await ctx.db.get(doc.userId);
        const file = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", doc.fileId))
          .first();

        let approver = null;
        if (doc.approvedBy) {
          approver = await ctx.db.get(doc.approvedBy);
        }

        return {
          ...doc,
          user,
          file,
          approver,
          downloadUrl: await ctx.storage.getUrl(doc.fileId),
        };
      }),
    );

    return docsWithUserDetails;
  },
});
// Query: Get all documents with their approval status (for admin dashboard)
export const getAllVehicleDocumentsWithApprovalStatus = query({
  args: {
    status: v.optional(ApprovalStatus),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can view all documents
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to view all documents");
    }

    const limit = args.limit || 100;

    let docs;

    if (args.status) {
      docs = await ctx.db
        .query("vehicle_docs")
        .withIndex("by_approval_status", (q) => q.eq("approvalStatus", args.status))
        .filter((q) => q.eq(q.field("isActive"), true))
        .order("desc")
        .take(limit);
    } else {
      docs = await ctx.db
        .query("vehicle_docs")
        .filter((q) => q.eq(q.field("isActive"), true))
        .order("desc")
        .take(limit);
    }

    const docsWithVehicleDetails = await Promise.all(
      docs.map(async (doc) => {
        const vehicle = await ctx.db.get(doc.vehicleId);
        const file = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", doc.fileId))
          .first();

        let approver = null;
        if (doc.approvedBy) {
          approver = await ctx.db.get(doc.approvedBy);
        }

        return {
          ...doc,
          vehicle,
          file,
          approver,
          downloadUrl: await ctx.storage.getUrl(doc.fileId),
        };
      }),
    );

    return docsWithVehicleDetails;
  },
});

// Query: Get document approval statistics
export const getDocumentApprovalStats = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can view stats
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized to view approval statistics");
    }

    // User documents stats
    const userDocsPending = await ctx.db
      .query("user_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "pending"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const userDocsApproved = await ctx.db
      .query("user_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "approved"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const userDocsRejected = await ctx.db
      .query("user_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "rejected"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    // Vehicle documents stats
    const vehicleDocsPending = await ctx.db
      .query("vehicle_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "pending"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const vehicleDocsApproved = await ctx.db
      .query("vehicle_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "approved"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const vehicleDocsRejected = await ctx.db
      .query("vehicle_docs")
      .withIndex("by_approval_status", (q) => q.eq("approvalStatus", "rejected"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return {
      userDocuments: {
        pending: userDocsPending.length,
        approved: userDocsApproved.length,
        rejected: userDocsRejected.length,
        total: userDocsPending.length + userDocsApproved.length + userDocsRejected.length,
      },
      vehicleDocuments: {
        pending: vehicleDocsPending.length,
        approved: vehicleDocsApproved.length,
        rejected: vehicleDocsRejected.length,
        total: vehicleDocsPending.length + vehicleDocsApproved.length + vehicleDocsRejected.length,
      },
    };
  },
});

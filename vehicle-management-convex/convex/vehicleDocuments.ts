import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isAdmin, isSuper } from "./utils";

// Export VehicleDocKind from schema
const VehicleDocKind = v.union(
  v.literal("VehicleRC"),
  v.literal("Insurance"),
  v.literal("Permit"),
  v.literal("Fitness"),
  v.literal("PollutionCertificate"),
  v.literal("TaxDocument"),
  v.literal("GoodsPermit"),
  v.literal("NationalPermit"),
);

// Generate a signed URL for uploading a vehicle document
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

// Mutation to handle vehicle document upload
export const submitVehicleDocuments = mutation({
  args: {
    vehicleId: v.id("vehicles"),
    docs: v.array(
      v.object({
        kind: VehicleDocKind,
        fileId: v.id("_storage"),
        expiry: v.optional(v.number()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Check if user has permission to upload documents for this vehicle
    // Only admin, super, or assigned driver can upload vehicle documents
    const vehicle = await ctx.db.get(args.vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    const isAuthorized = isAdmin(caller.userRoles) || isSuper(caller.userRoles);

    if (!isAuthorized) {
      throw new Error("Not authorized to upload documents for this vehicle");
    }

    const now = Date.now();
    const ids = [];

    for (const doc of args.docs) {
      // Check if document of this kind already exists for this vehicle
      const existingDoc = await ctx.db
        .query("vehicle_docs")
        .withIndex("by_vehicle_kind", (q) => q.eq("vehicleId", args.vehicleId).eq("kind", doc.kind))
        .filter((q) => q.eq(q.field("isActive"), true))
        .first();

      if (existingDoc) {
        // Hard delete the existing document
        if (existingDoc.fileId) {
          try {
            await ctx.storage.delete(existingDoc.fileId);
          } catch (error) {
            console.warn(`Failed to delete file ${existingDoc.fileId} from storage:`, error);
            // Continue with document deletion even if file deletion fails
          }
        }
        await ctx.db.delete(existingDoc._id);
      }

      // Insert new document
      const id = await ctx.db.insert("vehicle_docs", {
        vehicleId: args.vehicleId,
        kind: doc.kind,
        fileId: doc.fileId,
        expiry: doc.expiry,
        approvalStatus: "pending", // Set default approval status
        createdAt: now,
        createdBy: caller.appUser._id,
        isActive: true,
      });
      ids.push(id);
    }

    return { success: true, message: "Vehicle documents uploaded successfully", ids };
  },
});

// Query to get all documents for a vehicle
export const getVehicleDocuments = query({
  args: {
    vehicleId: v.id("vehicles"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const documents = await ctx.db
      .query("vehicle_docs")
      .withIndex("by_vehicle", (q) => q.eq("vehicleId", args.vehicleId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    // Get file metadata for each document
    const documentsWithFiles = await Promise.all(
      documents.map(async (doc) => {
        const file = await ctx.db
          .query("files")
          .withIndex("by_storageId", (q) => q.eq("storageId", doc.fileId))
          .first();

        return {
          ...doc,
          file,
          downloadUrl: await ctx.storage.getUrl(doc.fileId),
        };
      }),
    );

    return documentsWithFiles;
  },
});

// Query to get a specific vehicle document
export const getVehicleDocument = query({
  args: {
    documentId: v.id("vehicle_docs"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const document = await ctx.db.get(args.documentId);
    if (!document?.isActive) {
      throw new Error("Document not found");
    }

    const downloadUrl = await ctx.storage.getUrl(document.fileId);
    const file = await ctx.db
      .query("files")
      .withIndex("by_storageId", (q) => q.eq("storageId", document.fileId))
      .first();

    return {
      ...document,
      file,
      downloadUrl,
    };
  },
});

// Mutation to delete a vehicle document
export const deleteVehicleDocument = mutation({
  args: {
    documentId: v.id("vehicle_docs"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    // Check if user has permission to delete this document
    const vehicle = await ctx.db.get(document.vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    const isAuthorized = isAdmin(caller.userRoles) || isSuper(caller.userRoles);

    if (!isAuthorized) {
      throw new Error("Not authorized to delete this document");
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

    await ctx.db.delete(args.documentId);

    return { success: true, message: "Document permanently deleted" };
  },
});

// Query to get documents expiring soon
export const getExpiringVehicleDocuments = query({
  args: {
    daysAhead: v.optional(v.number()), // Default to 30 days
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin and super can view expiring documents across all vehicles
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const daysAhead = args.daysAhead || 30;
    const cutoffDate = Date.now() + daysAhead * 24 * 60 * 60 * 1000;

    const expiringDocs = await ctx.db
      .query("vehicle_docs")
      .withIndex("by_expiry", (q) => q.lte("expiry", cutoffDate))
      .filter((q) => q.and(q.eq(q.field("isActive"), true), q.neq(q.field("expiry"), undefined)))
      .collect();

    // Get vehicle and file details for each document
    const docsWithDetails = await Promise.all(
      expiringDocs.map(async (doc) => {
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

    return docsWithDetails;
  },
});

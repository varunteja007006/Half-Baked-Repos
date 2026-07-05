"use node";
import ExcelJS from "exceljs";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { PassThrough } from "stream"; // You will need to import 'stream'

// Server-side generate XLSX, upload to Convex storage and create trip_exports record
export const generateTripV1XlsxExport = action({
  args: {
    companyId: v.optional(v.id("companies")),
    driverId: v.optional(v.id("app_users")),
    routeId: v.optional(v.id("routes")),
    routeTypeId: v.optional(v.id("route_types")),
    typeId: v.optional(v.id("trip_types")),
    date: v.optional(v.number()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
    // optional metadata
    name: v.optional(v.string()),
    filename: v.optional(v.string()),
    sharedWith: v.optional(v.array(v.id("app_users"))),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const tripsWithNames = await ctx.runQuery(api.trip_v1.listTripV1, {
      companyId: args.companyId,
      driverId: args.driverId,
      routeId: args.routeId,
      routeTypeId: args.routeTypeId,
      typeId: args.typeId,
      date: args.date,
      startDate: args.startDate,
      endDate: args.endDate,
      limit: args.limit,
    });

    if (!tripsWithNames) {
      return {
        success: false,
        message: "Failed to fetch trips for export",
        data: null,
      };
    }

    if (tripsWithNames.length === 0) {
      return {
        success: false,
        message: "No trips found for export",
        data: null,
      };
    }

    // Generate XLSX in memory
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Trips");
    sheet.columns = [
      { header: "Trip ID", key: "tripId", width: 20 },
      { header: "Trip Sheet", key: "tripSheet", width: 20 },
      { header: "Date", key: "date", width: 15 },
      { header: "Company", key: "companyName", width: 25 },
      { header: "Route", key: "routeName", width: 25 },
      { header: "Touch Point", key: "touchPointName", width: 25 },
      { header: "Driver", key: "driverName", width: 25 },
      { header: "Vehicle", key: "vehicleName", width: 25 },
      { header: "Trip Type", key: "tripTypeName", width: 20 },
      { header: "Lane Type", key: "routeTypeName", width: 20 },
      { header: "Cost", key: "cost", width: 15 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Active", key: "isActive", width: 10 },
    ];
    tripsWithNames.forEach((t) => {
      sheet.addRow({
        tripId: t.tripId ?? "",
        tripSheet: t.tripSheet ? "Yes" : "No",
        date: t.date ? new Date(t.date).toLocaleDateString() : "",
        companyName: t.companyName || "",
        routeName: t.routeName || "",
        touchPointName: t.touchPoint || "",
        driverName: t.driverName || "",
        vehicleName: t.vehicleName || "",
        tripTypeName: t.tripTypeName || "",
        routeTypeName: t.routeTypeName || "",
        cost: t.cost ?? "",
        createdAt: t.createdAt ? new Date(t.createdAt).toLocaleString() : "",
        isActive: t.isActive ? "Yes" : "No",
      });
    });

    // 1. Setup a PassThrough stream to capture the output
    const stream = new PassThrough();

    // 2. Write the workbook to the stream (the streaming part)
    await workbook.xlsx.write(stream);

    // 3. Collect the stream content into a Buffer
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve());
      stream.on("error", (err) => reject(err));
      stream.end(); // Make sure the stream is closed if it wasn't already
    });
    const buffer = Buffer.concat(chunks);

    // 4. Convert Buffer to Blob to fix the type error for ctx.storage.store
    // This assumes you are in a runtime that supports the Blob constructor (e.g., V8 isolate, modern Node, or a polyfilled environment).
    // If not, you may need a runtime-specific conversion.
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const filename = args.filename?.trim() || `trips_export_${Date.now()}.xlsx`;
    const contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const size = blob.size; // Use blob.size now

    // Use the Blob object instead of the Buffer
    const storageId: Id<"_storage"> = await ctx.storage.store(blob);
    if (!storageId) {
      return {
        success: false,
        message: "Failed to upload export to storage",
        data: null,
      };
    }

    const downloadUrl = await ctx.storage.getUrl(storageId);

    // Create trip_exports record
    const result: { success: boolean; id: string } = await ctx.runMutation(
      internal.trip_v1_export.createTripV1Export,
      {
        companyId: args.companyId,
        driverId: args.driverId,
        routeId: args.routeId,
        routeTypeId: args.routeTypeId,
        typeId: args.typeId,
        startDate: args.startDate,
        endDate: args.endDate,
        limit: args.limit,
        storageId,
        filename,
        contentType,
        size,
        sharedWith: args.sharedWith,
        name: args.name,
        notes: args.notes,
      },
    );

    if (!result.success) {
      return {
        success: false,
        message: "Failed to create export record",
        data: null,
      };
    }
    return {
      success: true,
      message: "Export created successfully",
      data: { url: downloadUrl, exportId: result.id },
    };
  },
});

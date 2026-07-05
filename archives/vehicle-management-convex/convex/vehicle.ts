import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAppUserFromUserId, isAdmin, isSuper } from "./utils";

// Query: Get all vehicle manufacturers
export const getManufacturers = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("vehicle_manufacturers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Debug Query: Get all manufacturers (including inactive ones) for troubleshooting
export const getAllManufacturersDebug = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("vehicle_manufacturers")
      .collect();
  },
});

// Query: Get vehicle models by manufacturer
export const getModelsByManufacturer = query({
  args: {
    manufacturerId: v.id("vehicle_manufacturers"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("vehicle_models")
      .withIndex("by_manufacturer", (q) => q.eq("manufacturerId", args.manufacturerId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Query: Get all vehicle models with manufacturer details
export const getAllModelsWithManufacturer = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const models = await ctx.db
      .query("vehicle_models")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const modelsWithManufacturer = await Promise.all(
      models.map(async (model) => {
        const manufacturer = await ctx.db.get(model.manufacturerId);
        return { ...model, manufacturer };
      })
    );

    return modelsWithManufacturer;
  },
});

// Mutation: Create or update vehicle manufacturer
export const upsertManufacturer = mutation({
  args: {
    id: v.optional(v.id("vehicle_manufacturers")),
    name: v.string(),
    country: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can manage manufacturers
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const now = Date.now();

    // Check if manufacturer with same name already exists (for create or different ID for update)
    const existingByName = await ctx.db
      .query("vehicle_manufacturers")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();

    if (existingByName && (!args.id || existingByName._id !== args.id)) {
      throw new Error("Manufacturer with this name already exists");
    }

    if (args.id) {
      // Update existing manufacturer
      const existing = await ctx.db.get(args.id);
      if (!existing) {
        throw new Error("Manufacturer not found");
      }

      if (existing.deletedAt) {
        throw new Error("Cannot update deleted manufacturer");
      }

      await ctx.db.patch(args.id, {
        name: args.name,
        country: args.country,
        website: args.website,
        updatedAt: now,
        updatedBy: caller.appUser._id,
      });

      return { success: true, message: "Manufacturer updated successfully", id: args.id };
    } else {
      // Create new manufacturer
      const manufacturerId = await ctx.db.insert("vehicle_manufacturers", {
        name: args.name,
        country: args.country,
        website: args.website,
        createdAt: now,
        createdBy: caller.appUser._id,
        isActive: true,
      });

      return { success: true, message: "Manufacturer created successfully", id: manufacturerId };
    }
  },
});

// Mutation: Create or update vehicle model
export const upsertModel = mutation({
  args: {
    id: v.optional(v.id("vehicle_models")),
    manufacturerId: v.id("vehicle_manufacturers"),
    name: v.string(),
    type: v.union(
      v.literal("car"),
      v.literal("truck"),
      v.literal("maxi-cab"),
      v.literal("van"),
      v.literal("bus"),
      v.literal("motorcycle"),
      v.literal("pickup"),
      v.literal("suv")
    ),
    capacity: v.optional(v.number()),
    fuelType: v.optional(v.string()),
    engineSize: v.optional(v.string()),
    year: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can manage models
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const now = Date.now();

    // Verify manufacturer exists
    const manufacturer = await ctx.db.get(args.manufacturerId);
    if (!manufacturer || manufacturer.deletedAt) {
      throw new Error("Manufacturer not found or deleted");
    }

    // Check if model with same name already exists for this manufacturer
    const existingByName = await ctx.db
      .query("vehicle_models")
      .withIndex("by_manufacturer_name", (q) => 
        q.eq("manufacturerId", args.manufacturerId).eq("name", args.name)
      )
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();

    if (existingByName && (!args.id || existingByName._id !== args.id)) {
      throw new Error("Model with this name already exists for this manufacturer");
    }

    if (args.id) {
      // Update existing model
      const existing = await ctx.db.get(args.id);
      if (!existing) {
        throw new Error("Model not found");
      }

      if (existing.deletedAt) {
        throw new Error("Cannot update deleted model");
      }

      await ctx.db.patch(args.id, {
        manufacturerId: args.manufacturerId,
        name: args.name,
        type: args.type,
        capacity: args.capacity,
        fuelType: args.fuelType,
        engineSize: args.engineSize,
        year: args.year,
        description: args.description,
        updatedAt: now,
        updatedBy: caller.appUser._id,
      });

      return { success: true, message: "Model updated successfully", id: args.id };
    } else {
      // Create new model
      const modelId = await ctx.db.insert("vehicle_models", {
        manufacturerId: args.manufacturerId,
        name: args.name,
        type: args.type,
        capacity: args.capacity,
        fuelType: args.fuelType,
        engineSize: args.engineSize,
        year: args.year,
        description: args.description,
        createdAt: now,
        createdBy: caller.appUser._id,
        isActive: true,
      });

      return { success: true, message: "Model created successfully", id: modelId };
    }
  },
});

// Mutation: Soft delete manufacturer
export const deleteManufacturer = mutation({
  args: {
    id: v.id("vehicle_manufacturers"),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can delete manufacturers
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const manufacturer = await ctx.db.get(args.id);
    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }

    if (manufacturer.deletedAt) {
      throw new Error("Manufacturer already deleted");
    }

    // Check if there are active models for this manufacturer
    const activeModels = await ctx.db
      .query("vehicle_models")
      .withIndex("by_manufacturer", (q) => q.eq("manufacturerId", args.id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    if (activeModels.length > 0) {
      throw new Error("Cannot delete manufacturer with active models. Delete models first.");
    }

    const now = Date.now();

    await ctx.db.patch(args.id, {
      deletedAt: now,
      deletedBy: caller.appUser._id,
      isActive: false,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { success: true, message: "Manufacturer deleted successfully" };
  },
});

// Mutation: Soft delete model
export const deleteModel = mutation({
  args: {
    id: v.id("vehicle_models"),
  },
  async handler(ctx, args) {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can delete models
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const model = await ctx.db.get(args.id);
    if (!model) {
      throw new Error("Model not found");
    }

    if (model.deletedAt) {
      throw new Error("Model already deleted");
    }

    // Check if there are active vehicles using this model
    const activeVehicles = await ctx.db
      .query("vehicles")
      .withIndex("by_model", (q) => q.eq("modelId", args.id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    if (activeVehicles.length > 0) {
      throw new Error("Cannot delete model with active vehicles. Update vehicles to use different model first.");
    }

    const now = Date.now();

    await ctx.db.patch(args.id, {
      deletedAt: now,
      deletedBy: caller.appUser._id,
      isActive: false,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { success: true, message: "Model deleted successfully" };
  },
});

// Query: Get all vehicles
export const getVehicles = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("vehicles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Query: Get a specific vehicle by ID
export const getVehicleById = query({
  args: {
    vehicleId: v.id("vehicles"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const vehicle = await ctx.db.get(args.vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    // Get the vehicle model and manufacturer details
    const model = await ctx.db.get(vehicle.modelId);
    const manufacturer = model ? await ctx.db.get(model.manufacturerId) : null;

    return {
      ...vehicle,
      model,
      manufacturer,
    };
  },
});

// Mutation: Create or update vehicle instance
export const upsertVehicle = mutation({
  args: {
    id: v.optional(v.id("vehicles")),
    modelId: v.id("vehicle_models"),
    plate: v.string(),
    vin: v.optional(v.string()),
    registrationNumber: v.optional(v.string()),
    color: v.optional(v.string()),
    year: v.optional(v.number()),
    purchaseDate: v.optional(v.number()),
    mileage: v.optional(v.number()),
    fuelEfficiency: v.optional(v.number()),
    insuranceExpiryDate: v.optional(v.number()),
    lastServiceDate: v.optional(v.number()),
    nextServiceDue: v.optional(v.number()),
    active: v.boolean(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can manage vehicles
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const now = Date.now();

    // Verify model exists
    const model = await ctx.db.get(args.modelId);
    if (!model || model.deletedAt) {
      throw new Error("Vehicle model not found or deleted");
    }

    // Check if vehicle with same plate already exists
    const existingByPlate = await ctx.db
      .query("vehicles")
      .withIndex("by_plate", (q) => q.eq("plate", args.plate))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();

    if (existingByPlate && (!args.id || existingByPlate._id !== args.id)) {
      throw new Error("Vehicle with this plate number already exists");
    }

    if (args.id) {
      // Update existing vehicle
      const existing = await ctx.db.get(args.id);
      if (!existing) {
        throw new Error("Vehicle not found");
      }

      if (existing.deletedAt) {
        throw new Error("Cannot update deleted vehicle");
      }

      await ctx.db.patch(args.id, {
        modelId: args.modelId,
        plate: args.plate,
        vin: args.vin,
        registrationNumber: args.registrationNumber,
        color: args.color,
        year: args.year,
        purchaseDate: args.purchaseDate,
        mileage: args.mileage,
        fuelEfficiency: args.fuelEfficiency,
        insuranceExpiryDate: args.insuranceExpiryDate,
        lastServiceDate: args.lastServiceDate,
        nextServiceDue: args.nextServiceDue,
        active: args.active,
        notes: args.notes,
        updatedAt: now,
        updatedBy: caller.appUser._id,
      });

      return { success: true, message: "Vehicle updated successfully", id: args.id };
    } else {
      // Create new vehicle
      const vehicleId = await ctx.db.insert("vehicles", {
        modelId: args.modelId,
        plate: args.plate,
        vin: args.vin,
        registrationNumber: args.registrationNumber,
        color: args.color,
        year: args.year,
        purchaseDate: args.purchaseDate,
        mileage: args.mileage,
        fuelEfficiency: args.fuelEfficiency,
        insuranceExpiryDate: args.insuranceExpiryDate,
        lastServiceDate: args.lastServiceDate,
        nextServiceDue: args.nextServiceDue,
        active: args.active,
        notes: args.notes,
        createdAt: now,
        createdBy: caller.appUser._id,
        isActive: true,
      });

      return { success: true, message: "Vehicle created successfully", id: vehicleId };
    }
  },
});

// Mutation: Soft delete vehicle
export const deleteVehicle = mutation({
  args: {
    id: v.id("vehicles"),
  },
  handler: async (ctx, args) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    // Only admin or super can delete vehicles
    if (!(isAdmin(caller.userRoles) || isSuper(caller.userRoles))) {
      throw new Error("Not authorized");
    }

    const vehicle = await ctx.db.get(args.id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.deletedAt) {
      throw new Error("Vehicle already deleted");
    }

    // Check if there are active trips for this vehicle
    const activeTrips = await ctx.db
      .query("trips")
      .withIndex("by_vehicle", (q) => q.eq("vehicleId", args.id))
      .filter((q) => q.neq(q.field("status"), "Completed"))
      .collect();

    if (activeTrips.length > 0) {
      throw new Error("Cannot delete vehicle with active trips. Complete trips first.");
    }

    const now = Date.now();

    await ctx.db.patch(args.id, {
      deletedAt: now,
      deletedBy: caller.appUser._id,
      isActive: false,
      updatedAt: now,
      updatedBy: caller.appUser._id,
    });

    return { success: true, message: "Vehicle deleted successfully" };
  },
});

// Query: Get vehicles with model and manufacturer details
export const getVehiclesWithDetails = query({
  handler: async (ctx) => {
    const caller = await getAppUserFromUserId(ctx);
    if (!caller?.appUser) {
      throw new Error("Not authenticated");
    }

    const vehicles = await ctx.db
      .query("vehicles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const vehiclesWithDetails = await Promise.all(
      vehicles.map(async (vehicle) => {
        const model = await ctx.db.get(vehicle.modelId);
        const manufacturer = model ? await ctx.db.get(model.manufacturerId) : null;
        return {
          ...vehicle,
          model,
          manufacturer,
        };
      })
    );

    return vehiclesWithDetails;
  },
});

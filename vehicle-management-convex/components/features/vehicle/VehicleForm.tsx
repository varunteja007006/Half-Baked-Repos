"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SearchableCombobox, YearPicker, SimpleColorPicker, DatePicker } from "@/components/atom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { withErrorHandling } from "@/lib/error-handler";

const formSchema = z.object({
  modelId: z.string().min(1, "Please select a vehicle model"),
  plate: z
    .string()
    .min(1, "Plate number is required")
    .max(20, "Plate number must be less than 20 characters")
    .regex(/^[A-Z0-9\s-]+$/i, "Plate number can only contain letters, numbers, spaces and hyphens"),
  vin: z.string().max(17, "VIN must be 17 characters or less").optional().or(z.literal("")),
  registrationNumber: z
    .string()
    .max(50, "Registration number must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  color: z.string().max(30, "Color must be less than 30 characters").optional().or(z.literal("")),
  year: z
    .number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 2, "Year cannot be in the distant future")
    .optional(),
  purchaseDate: z.string().optional(),
  mileage: z.number().min(0, "Mileage cannot be negative").optional(),
  fuelEfficiency: z.number().min(0, "Fuel efficiency cannot be negative").optional(),
  insuranceExpiryDate: z.string().optional(),
  lastServiceDate: z.string().optional(),
  nextServiceDue: z.string().optional(),
  active: z.boolean(),
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

interface VehicleFormProps {
  vehicleId?: Id<"vehicles">;
  onSuccess?: () => void;
}

export default function VehicleForm({ vehicleId, onSuccess }: Readonly<VehicleFormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const isEditing = !!vehicleId;

  // Get vehicle data if editing
  const vehicle = useQuery(api.vehicle.getVehicleById, vehicleId ? { vehicleId } : "skip");

  // Get all models with manufacturer details for dropdown
  const modelsWithManufacturer = useQuery(api.vehicle.getAllModelsWithManufacturer);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelId: "",
      plate: "",
      vin: "",
      registrationNumber: "",
      color: "",
      year: undefined,
      purchaseDate: "",
      mileage: undefined,
      fuelEfficiency: undefined,
      insuranceExpiryDate: "",
      lastServiceDate: "",
      nextServiceDue: "",
      active: true,
      notes: "",
    },
  });

  const upsertVehicle = useMutation(api.vehicle.upsertVehicle);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await withErrorHandling(
      async () => {
        const result = await upsertVehicle({
          id: vehicleId,
          modelId: values.modelId as Id<"vehicle_models">,
          plate: values.plate.toUpperCase(),
          vin: values.vin || undefined,
          registrationNumber: values.registrationNumber || undefined,
          color: values.color || undefined,
          year: values.year,
          purchaseDate: values.purchaseDate ? new Date(values.purchaseDate).getTime() : undefined,
          mileage: values.mileage,
          fuelEfficiency: values.fuelEfficiency,
          insuranceExpiryDate: values.insuranceExpiryDate
            ? new Date(values.insuranceExpiryDate).getTime()
            : undefined,
          lastServiceDate: values.lastServiceDate
            ? new Date(values.lastServiceDate).getTime()
            : undefined,
          nextServiceDue: values.nextServiceDue
            ? new Date(values.nextServiceDue).getTime()
            : undefined,
          active: values.active,
          notes: values.notes || undefined,
        });
        return result;
      },
      {
        loadingMessage: isEditing ? "Updating vehicle..." : "Creating vehicle...",
        successMessage: isEditing ? "Vehicle updated successfully" : "Vehicle created successfully",
        errorMessage: "Failed to save vehicle",
      },
    );

    if (result) {
      if (!isEditing) {
        form.reset({
          modelId: "",
          plate: "",
          vin: "",
          registrationNumber: "",
          color: "",
          year: undefined,
          purchaseDate: "",
          mileage: undefined,
          fuelEfficiency: undefined,
          insuranceExpiryDate: "",
          lastServiceDate: "",
          nextServiceDue: "",
          active: true,
          notes: "",
        });
      }
      onSuccess?.();
    }
    setIsLoading(false);
  }

  // Update form when vehicle data is loaded
  React.useEffect(() => {
    if (vehicle) {
      form.reset({
        modelId: vehicle.modelId,
        plate: vehicle.plate,
        vin: vehicle.vin || "",
        registrationNumber: vehicle.registrationNumber || "",
        color: vehicle.color || "",
        year: vehicle.year || undefined,
        purchaseDate: vehicle.purchaseDate
          ? new Date(vehicle.purchaseDate).toISOString().split("T")[0]
          : "",
        mileage: vehicle.mileage || undefined,
        fuelEfficiency: vehicle.fuelEfficiency || undefined,
        insuranceExpiryDate: vehicle.insuranceExpiryDate
          ? new Date(vehicle.insuranceExpiryDate).toISOString().split("T")[0]
          : "",
        lastServiceDate: vehicle.lastServiceDate
          ? new Date(vehicle.lastServiceDate).toISOString().split("T")[0]
          : "",
        nextServiceDue: vehicle.nextServiceDue
          ? new Date(vehicle.nextServiceDue).toISOString().split("T")[0]
          : "",
        active: vehicle.active,
        notes: vehicle.notes || "",
      });
    }
  }, [vehicle, form]);

  // Prepare model options for dropdown
  const modelOptions = React.useMemo(() => {
    if (!modelsWithManufacturer) return [];

    return modelsWithManufacturer.map((model) => ({
      value: model._id,
      label: `${model.manufacturer?.name || "Unknown"} ${model.name} (${model.type})`,
    }));
  }, [modelsWithManufacturer]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SearchableCombobox
          control={form.control}
          name="modelId"
          label="Vehicle Model"
          placeholder="Select a vehicle model"
          searchPlaceholder="Search models..."
          description="Choose the vehicle model"
          required
          options={modelOptions}
          emptyMessage="No vehicle model found."
        />

        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plate Number *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., ABC-1234, MH01-AB-1234"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormDescription>Vehicle plate/license number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VIN</FormLabel>
              <FormControl>
                <Input placeholder="17-character Vehicle Identification Number" {...field} />
              </FormControl>
              <FormDescription>Vehicle Identification Number (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="Vehicle registration number" {...field} />
              </FormControl>
              <FormDescription>Official registration number (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SimpleColorPicker
          control={form.control}
          name="color"
          label="Color"
          description="Vehicle color"
        />

        <YearPicker
          control={form.control}
          name="year"
          label="Manufacturing Year"
          placeholder="Select year"
          description="Year of manufacture"
        />

        <DatePicker
          control={form.control}
          name="purchaseDate"
          label="Purchase Date"
          placeholder="Select purchase date"
          description="When the vehicle was purchased"
          calendarDisabled={{ after: new Date() }}
        />

        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Mileage (km)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 50000"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                  }
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Current odometer reading</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuelEfficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Efficiency (km/L)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="e.g., 15.5"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                  }
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Kilometers per liter</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DatePicker
          control={form.control}
          name="insuranceExpiryDate"
          label="Insurance Expiry"
          placeholder="Select insurance expiry date"
          description="Insurance expiry date"
          calendarDisabled={{ before: new Date() }}
        />

        <DatePicker
          control={form.control}
          name="lastServiceDate"
          label="Last Service Date"
          placeholder="Select last service date"
          description="Last maintenance date"
          calendarDisabled={{ after: new Date() }}
        />

        <DatePicker
          control={form.control}
          name="nextServiceDue"
          label="Next Service Due"
          placeholder="Select next service due date"
          description="Next service due date"
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Vehicle</FormLabel>
                <FormDescription>
                  Whether this vehicle is active in the fleet and available for trips
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional notes about this vehicle..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional additional information about the vehicle</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row w-full items-center justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isLoading}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {(() => {
              if (isLoading) {
                return isEditing ? "Updating..." : "Creating...";
              }
              return isEditing ? "Update Vehicle" : "Create Vehicle";
            })()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

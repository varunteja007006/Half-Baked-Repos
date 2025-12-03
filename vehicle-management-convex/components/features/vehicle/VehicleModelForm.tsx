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
import { SearchableCombobox, YearPicker } from "@/components/atom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { withErrorHandling } from "@/lib/error-handler";

const VEHICLE_TYPES = [
  { value: "car", label: "Car" },
  { value: "truck", label: "Truck" },
  { value: "maxi-cab", label: "Maxi-Cab" },
  { value: "van", label: "Van" },
  { value: "bus", label: "Bus" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "pickup", label: "Pickup" },
  { value: "suv", label: "SUV" },
];

const FUEL_TYPES = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "CNG", label: "CNG" },
  { value: "LPG", label: "LPG" },
];

const formSchema = z.object({
  manufacturerId: z.string().min(1, "Please select a manufacturer"),
  name: z
    .string()
    .min(2, "Model name must be at least 2 characters")
    .max(100, "Model name must be less than 100 characters"),
  type: z.enum(["car", "truck", "maxi-cab", "van", "bus", "motorcycle", "pickup", "suv"]),
  capacity: z.number().positive("Capacity must be positive").optional(),
  fuelType: z.string().optional(),
  engineSize: z
    .string()
    .max(20, "Engine size must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  year: z
    .number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 2, "Year cannot be in the distant future")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

interface VehicleModelFormProps {
  modelId?: Id<"vehicle_models">;
  preselectedManufacturerId?: Id<"vehicle_manufacturers">;
  onSuccess?: () => void;
}

export default function VehicleModelForm({
  modelId,
  preselectedManufacturerId,
  onSuccess,
}: Readonly<VehicleModelFormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const isEditing = !!modelId;

  // Get manufacturers for dropdown
  const manufacturers = useQuery(api.vehicle.getManufacturers);

  // Convert manufacturers to combobox options
  const manufacturerOptions = React.useMemo(
    () =>
      manufacturers?.map((manufacturer) => {
        const countryPart = manufacturer.country ? ` (${manufacturer.country})` : "";
        return {
          value: manufacturer._id,
          label: `${manufacturer.name}${countryPart}`,
          searchValue: `${manufacturer.name} ${manufacturer.country || ""}`,
        };
      }) || [],
    [manufacturers],
  );

  // Get all models to find the one being edited
  const allModels = useQuery(api.vehicle.getAllModelsWithManufacturer);
  const model = allModels?.find((m) => m._id === modelId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manufacturerId: preselectedManufacturerId || "",
      name: "",
      type: "car",
      capacity: undefined,
      fuelType: "",
      engineSize: "",
      year: undefined,
      description: "",
    },
  });

  const upsertModel = useMutation(api.vehicle.upsertModel);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await withErrorHandling(
      async () => {
        const result = await upsertModel({
          id: modelId,
          manufacturerId: values.manufacturerId as Id<"vehicle_manufacturers">,
          name: values.name,
          type: values.type,
          capacity: values.capacity,
          fuelType: values.fuelType || undefined,
          engineSize: values.engineSize || undefined,
          year: values.year,
          description: values.description || undefined,
        });
        return result;
      },
      {
        loadingMessage: isEditing ? "Updating vehicle model..." : "Creating vehicle model...",
        successMessage: isEditing
          ? "Vehicle model updated successfully"
          : "Vehicle model created successfully",
        errorMessage: "Failed to save vehicle model",
      },
    );

    if (result) {
      if (!isEditing) {
        form.reset({
          manufacturerId: preselectedManufacturerId || "",
          name: "",
          type: "car",
          capacity: undefined,
          fuelType: "",
          engineSize: "",
          year: undefined,
          description: "",
        });
      }
      onSuccess?.();
    }
    setIsLoading(false);
  }

  // Update form when model data is loaded
  React.useEffect(() => {
    if (model) {
      form.reset({
        manufacturerId: model.manufacturerId,
        name: model.name,
        type: model.type,
        capacity: model.capacity || undefined,
        fuelType: model.fuelType || "",
        engineSize: model.engineSize || "",
        year: model.year || undefined,
        description: model.description || "",
      });
    }
  }, [model, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SearchableCombobox
          control={form.control}
          name="manufacturerId"
          label="Manufacturer"
          placeholder="Select a manufacturer"
          searchPlaceholder="Search manufacturers..."
          description="Choose the vehicle manufacturer"
          required
          options={manufacturerOptions}
          emptyMessage="No manufacturer found."
          onSelectionChange={(value, option) => {
            // Optional: Add any side effects when manufacturer is selected
            console.log("Selected manufacturer:", value, option);
          }}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Camry, F-150, Ace" {...field} />
              </FormControl>
              <FormDescription>The model name (e.g., Camry, Corolla)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={() => (
            <FormItem>
              <FormLabel>Vehicle Type *</FormLabel>
              <SearchableCombobox
                control={form.control}
                name="type"
                label=""
                options={VEHICLE_TYPES}
                placeholder="Select vehicle type"
                emptyMessage="No vehicle type found"
                searchPlaceholder="Search vehicle types..."
              />
              <FormDescription>Type of vehicle</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 5, 1000"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                  }
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Passenger count or cargo weight (kg)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuelType"
          render={() => (
            <FormItem>
              <FormLabel>Fuel Type</FormLabel>
              <SearchableCombobox
                control={form.control}
                name="fuelType"
                label=""
                options={FUEL_TYPES}
                placeholder="Select fuel type"
                emptyMessage="No fuel type found"
                searchPlaceholder="Search fuel types..."
                description="Primary fuel type"
              />
            </FormItem>
          )}
        />

        <YearPicker
          control={form.control}
          name="year"
          label="Model Year"
          description="Model year"
          placeholder="Select year..."
          searchPlaceholder="Search year..."
          minYear={1900}
          maxYear={new Date().getFullYear()}
          onSelectionChange={(year) => {
            // Optional: Add any side effects when year is selected
            console.log("Selected year:", year);
          }}
        />

        <FormField
          control={form.control}
          name="engineSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine Size</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2.0L, 1500cc, 150kW" {...field} />
              </FormControl>
              <FormDescription>Engine displacement or power specification</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional details about this vehicle model..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional additional information about the model</FormDescription>
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
              return isEditing ? "Update Model" : "Create Model";
            })()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

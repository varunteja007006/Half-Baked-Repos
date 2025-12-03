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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { withErrorHandling } from "@/lib/error-handler";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

interface ManufacturerFormProps {
  manufacturerId?: Id<"vehicle_manufacturers">;
  onSuccess?: () => void;
}

export default function ManufacturerForm({
  manufacturerId,
  onSuccess,
}: Readonly<ManufacturerFormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const isEditing = !!manufacturerId;

  // Get manufacturers to populate form for editing
  const manufacturers = useQuery(api.vehicle.getManufacturers);
  const manufacturer = manufacturers?.find((m) => m._id === manufacturerId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      website: "",
    },
  });

  const upsertManufacturer = useMutation(api.vehicle.upsertManufacturer);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await withErrorHandling(
      async () => {
        const result = await upsertManufacturer({
          id: manufacturerId,
          name: values.name,
          country: values.country || undefined,
          website: values.website || undefined,
        });
        return result;
      },
      {
        loadingMessage: isEditing ? "Updating manufacturer..." : "Creating manufacturer...",
        successMessage: isEditing
          ? "Manufacturer updated successfully"
          : "Manufacturer created successfully",
        errorMessage: "Failed to save manufacturer",
      },
    );

    if (result) {
      if (!isEditing) {
        form.reset();
      }
      onSuccess?.();
    }
    setIsLoading(false);
  }

  // Update form when manufacturer data is loaded
  React.useEffect(() => {
    if (manufacturer) {
      form.reset({
        name: manufacturer.name,
        country: manufacturer.country || "",
        website: manufacturer.website || "",
      });
    }
  }, [manufacturer, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Manufacturer Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Toyota, Ford, Tata Motors"
                  className="text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                The official name of the vehicle manufacturer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Country</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Japan, USA, India" className="text-base" {...field} />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Country where the manufacturer is based
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.manufacturer.com"
                  className="text-base"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs sm:text-sm">
                Official website URL (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile responsive button layout */}
        <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center justify-end gap-3 sm:gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
            className="order-2 sm:order-1 w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="order-1 sm:order-2 w-full sm:w-auto"
          >
            {(() => {
              if (isLoading) {
                return isEditing ? "Updating..." : "Creating...";
              }
              return isEditing ? "Update Manufacturer" : "Create Manufacturer";
            })()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
import { SimpleSearchableCombobox } from "@/components/atom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  companyId: z.string().optional(),
});

export interface RouteTypeFormProps {
  routeTypeId?: Id<"route_types">;
  onSuccess?: () => void;
}

export default function RouteTypeForm({ routeTypeId, onSuccess }: Readonly<RouteTypeFormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);

  const createRouteType = useMutation(api.routeType.createRouteType);
  const updateRouteType = useMutation(api.routeType.updateRouteType);

  // Get existing route type data if editing
  const existingRouteType = useQuery(
    api.routeType.getRouteType,
    routeTypeId ? { id: routeTypeId } : "skip",
  );

  // Get companies for dropdown
  const companies = useQuery(api.company.getCompanies, {
    includeInactive: false,
  });

  const companyOptions = React.useMemo(() => {
    if (!companies) return [];
    return [
      ...companies.map((company) => ({
        value: company._id,
        label: company.name,
      })),
    ];
  }, [companies]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingRouteType?.name || "",
      description: existingRouteType?.description || "",
      companyId: existingRouteType?.companyId || "",
    },
  });

  // Update form when existing data is loaded
  React.useEffect(() => {
    if (existingRouteType) {
      form.reset({
        name: existingRouteType.name,
        description: existingRouteType.description || "",
        companyId: existingRouteType.companyId || "",
      });
    }
  }, [existingRouteType, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await withErrorHandling(
      async () => {
        if (routeTypeId) {
          // Update existing route type
          const id = await updateRouteType({
            id: routeTypeId,
            name: values.name,
            description: values.description || undefined,
            companyId: values.companyId ? (values.companyId as Id<"companies">) : undefined,
          });
          return id;
        } else {
          // Create new route type
          const id = await createRouteType({
            name: values.name,
            description: values.description || undefined,
            companyId: values.companyId ? (values.companyId as Id<"companies">) : undefined,
          });
          return id;
        }
      },
      {
        successMessage: routeTypeId
          ? "Route type updated successfully!"
          : "Route type created successfully!",
      },
    );

    setIsLoading(false);

    if (result) {
      form.reset();
      onSuccess?.();
    }
  }

  const isEdit = !!routeTypeId;

  const getButtonText = () => {
    if (isLoading) {
      return isEdit ? "Updating..." : "Creating...";
    }
    return isEdit ? "Update Route Type" : "Create Route Type";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Route Type Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Local/Zonal, Regional, Line haul" {...field} />
              </FormControl>
              <FormDescription>Enter a unique name for the route type.</FormDescription>
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
                  placeholder="Optional description of the route type..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide additional details about this route type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <SimpleSearchableCombobox
                  options={companyOptions}
                  value={field.value || ""}
                  onSelect={field.onChange}
                  placeholder="Select company or leave for global"
                  emptyMessage="No companies found"
                />
              </FormControl>
              <FormDescription>
                Select a specific company or leave empty for global route type.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {getButtonText()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

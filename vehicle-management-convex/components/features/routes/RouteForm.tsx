"use client";

import React from "react";
import { useQuery, useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchableCombobox } from "@/components/atom";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";
import { Id } from "@/convex/_generated/dataModel";

const routeFormSchema = z.object({
  name: z.string().min(1, "Route name is required"),
  companyId: z.string().min(1, "Company is required").optional(),
  routeTypeId: z.string().optional(),
  baseAmount: z.number().min(0, "Base amount must be positive").optional(),

  // Start location details
  startAddress: z.string().optional(),
  startPincode: z.string().optional(),
  startState: z.string().optional(),
  startLocation: z.string().optional(),

  // End location details
  endAddress: z.string().optional(),
  endPincode: z.string().optional(),
  endState: z.string().optional(),
  endLocation: z.string().optional(),

  // Route details
  distance: z.number().optional(),
  estimatedDuration: z.number().optional(),
});

type RouteFormData = z.infer<typeof routeFormSchema>;

interface RouteFormProps {
  routeId?: Id<"routes">;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function RouteForm({ routeId, onSuccess, onCancel }: Readonly<RouteFormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);

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

  // Fetch route types for dropdown with error handling
  // const routeTypes = useQuery(api.routeType.getRouteTypes, "skip");

  // Fetch existing route data if editing
  const existingRoute = useQuery(api.route.getRouteWithDetails, routeId ? { id: routeId } : "skip");

  const createRoute = useMutation(api.route.createRoute);
  const updateRoute = useMutation(api.route.updateRoute);

  const form = useForm<RouteFormData>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      name: "",
      companyId: undefined,
      baseAmount: undefined,
      startAddress: "",
      startPincode: "",
      startState: "",
      startLocation: "",
      endAddress: "",
      endPincode: "",
      endState: "",
      endLocation: "",
      distance: undefined,
      estimatedDuration: undefined,
      routeTypeId: undefined,
    },
  });

  // Populate form when editing existing route
  React.useEffect(() => {
    if (existingRoute) {
      form.reset({
        name: existingRoute.name,
        companyId: existingRoute.companyId || "",
        baseAmount: existingRoute.baseAmount,
        startAddress: existingRoute.startAddress || "",
        startPincode: existingRoute.startPincode || "",
        startState: existingRoute.startState || "",
        startLocation: existingRoute.startLocation || "",
        endAddress: existingRoute.endAddress || "",
        endPincode: existingRoute.endPincode || "",
        endState: existingRoute.endState || "",
        endLocation: existingRoute.endLocation || "",
        distance: existingRoute.distance,
        estimatedDuration: existingRoute.estimatedDuration,
        routeTypeId: existingRoute.routeTypeId || undefined,
      });
    }
  }, [existingRoute, form]);

  // Update route types query when company is selected
  const selectedCompanyId = form.watch("companyId");
  const routeTypesForCompany = useQuery(
    api.routeType.getRouteTypes,
    selectedCompanyId
      ? {
          companyId: selectedCompanyId as Id<"companies">,
          includeInactive: false,
        }
      : { includeInactive: false },
  );
  console.log(routeTypesForCompany);
  async function onSubmit(data: RouteFormData) {
    setIsLoading(true);

    const result = await withErrorHandling(
      async () => {
        const routeData = {
          companyId: data.companyId as Id<"companies">,
          name: data.name,
          baseAmount: data.baseAmount,
          startAddress: data.startAddress || undefined,
          startPincode: data.startPincode || undefined,
          startState: data.startState || undefined,
          startLocation: data.startLocation || undefined,
          endAddress: data.endAddress || undefined,
          endPincode: data.endPincode || undefined,
          endState: data.endState || undefined,
          endLocation: data.endLocation || undefined,
          distance: data.distance || undefined,
          estimatedDuration: data.estimatedDuration || undefined,
          routeTypeId: data.routeTypeId ? (data.routeTypeId as Id<"route_types">) : undefined,
        };

        if (routeId) {
          const id = await updateRoute({
            id: routeId,
            name: routeData.name,
            baseAmount: routeData.baseAmount,
            startAddress: routeData.startAddress,
            startPincode: routeData.startPincode,
            startState: routeData.startState,
            startLocation: routeData.startLocation,
            endAddress: routeData.endAddress,
            endPincode: routeData.endPincode,
            endState: routeData.endState,
            endLocation: routeData.endLocation,
            distance: routeData.distance,
            estimatedDuration: routeData.estimatedDuration,
            routeTypeId: routeData.routeTypeId,
          });
          return id;
        } else {
          const id = await createRoute(routeData);
          return id;
        }
      },
      {
        successMessage: routeId ? "Route updated successfully!" : "Route created successfully!",
      },
    );

    setIsLoading(false);

    if (result) {
      form.reset();
      onSuccess?.();
    }
  }

  const isEdit = !!routeId;

  const getButtonText = () => {
    if (isLoading) {
      return isEdit ? "Updating..." : "Creating...";
    }
    return isEdit ? "Update Route" : "Create Route";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Route Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mumbai to Pune" {...field} />
                </FormControl>
                <FormDescription>Enter a unique name for the route.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SearchableCombobox
            control={form.control}
            name="companyId"
            label="Company"
            options={companyOptions}
            placeholder="Select company"
            emptyMessage="No companies found"
            description="Select the company for this route."
          />

          <SearchableCombobox
            control={form.control}
            name="routeTypeId"
            label="Route Type"
            options={
              routeTypesForCompany?.map((routeType) => ({
                value: routeType._id,
                label: routeType.name,
              })) || []
            }
            placeholder="Select route type"
            emptyMessage="No route types found"
            description="Choose a route type for this route."
          />

          <FormField
            control={form.control}
            name="baseAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>Base pricing for this route.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Start Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Start Location</h3>

          <FormField
            control={form.control}
            name="startAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Andheri East, Mumbai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Maharashtra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startPincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 400069" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPS Coordinates</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 19.1136,72.8697" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* End Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">End Location</h3>

          <FormField
            control={form.control}
            name="endAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Shivajinagar, Pune" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Maharashtra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endPincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 411005" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPS Coordinates</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 18.5204,73.8567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Route Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Route Details</h3>

          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 148.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 180"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {getButtonText()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

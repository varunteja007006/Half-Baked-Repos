"use client";

import React from "react";
import { useQuery, useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SearchableCombobox } from "@/components/atom";
import { DateTimePickerDialog } from "@/components/atom/date-time-picker-24h";
import { Id } from "@/convex/_generated/dataModel";

const tripV1Schema = z.object({
  dateTime: z.date(),
  companyId: z.string().min(1, {
    message: "Select an option",
  }),
  routeId: z.string().min(1, {
    message: "Select an option",
  }),
  touchPoint: z.string().optional(),
  typeId: z.string().min(1, {
    message: "Select an option",
  }),
  routeTypeId: z.string().min(1, {
    message: "Select an option",
  }),
  vehicleId: z.string().min(1, {
    message: "Select an option",
  }),
  driverId: z.string().min(1, {
    message: "Select an option",
  }),
  tripId: z.string().optional(),
  tripSheet: z.boolean().optional(),
  cost: z.number().optional(),
});

type TripV1FormData = z.infer<typeof tripV1Schema>;

interface TripV1FormProps {
  id?: Id<"trip_v1">; // edit mode if present
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function TripV1Form({ id, onSuccess, onCancel }: Readonly<TripV1FormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);

  // Lists for selects
  const companies = useQuery(api.company.getCompanies, { includeInactive: false });
  const routes = useQuery(api.route.getRoutes, { includeInactive: false });
  const routeTypes = useQuery(api.routeType.getRouteTypes, { includeInactive: false });
  const tripTypes = useQuery(api.tripType.getTripTypes, { includeInactive: false });
  const vehicles = useQuery(api.vehicle.getVehicles, {});
  const users = useQuery(api.appUser.adminListUsers, { onlyActive: true });

  const createTrip = useMutation(api.trip_v1.createTripV1);
  const updateTrip = useMutation(api.trip_v1.updateTripV1);
  const existing = useQuery(api.trip_v1.getTripV1, id ? { id } : "skip");

  // Use a permissive form typing to avoid resolver/control type conflicts across module boundaries
  const form = useForm<TripV1FormData>({
    resolver: zodResolver(tripV1Schema),
    defaultValues: {
      dateTime: new Date(),
      companyId: "",
      routeId: "",
      touchPoint: "",
      typeId: "",
      routeTypeId: "",
      vehicleId: "",
      driverId: "",
      tripId: "",
      tripSheet: false,
      cost: undefined,
    },
  });

  React.useEffect(() => {
    if (existing) {
      // convert epoch ms to a Date object for the DateTime picker
      if (!existing.data) {
        form.reset();
        return;
      }

      const d = new Date(existing.data?.date || Date.now());
      form.reset({
        dateTime: d,
        companyId: existing.data.companyId || "",
        routeId: existing.data.routeId || "",
        touchPoint: existing.data.touchPoint || "",
        typeId: existing.data.typeId || "",
        routeTypeId: existing.data.routeTypeId || "",
        vehicleId: existing.data.vehicleId || "",
        driverId: existing.data.driverId || "",
        tripId: existing.data.tripId || "",
        tripSheet: !!existing.data.tripSheet,
        cost: existing.data.cost ?? undefined,
      });
    }
  }, [existing, form]);

  // Helper options
  const companyOptions = React.useMemo(() => {
    if (!companies) return [];
    return companies.map((c) => ({ value: c._id, label: c.name }));
  }, [companies]);

  const routeOptions = React.useMemo(() => {
    if (!routes) return [];
    return routes.map((r) => ({ value: r._id, label: r.name }));
  }, [routes]);

  const routeTypeOptions = React.useMemo(() => {
    if (!routeTypes) return [];
    return routeTypes.map((t) => ({ value: t._id, label: t.name }));
  }, [routeTypes]);

  const tripTypeOptions = React.useMemo(() => {
    if (!tripTypes) return [];
    return tripTypes.map((t) => ({ value: t._id, label: t.name }));
  }, [tripTypes]);

  const vehicleOptions = React.useMemo(() => {
    if (!vehicles) return [];
    return vehicles.map((v) => ({ value: v._id, label: v.name || v.plate || v._id }));
  }, [vehicles]);

  const driverOptions = React.useMemo(() => {
    if (!users) return [];
    return users.map((u) => ({
      value: u.appUser._id,
      label: u.appUser.name || u.appUser.email || String(u.appUser._id),
    }));
  }, [users]);

  const onSubmit = async (data: TripV1FormData) => {
    setIsLoading(true);

    const payload = {
      date: data.dateTime.getTime(),
      companyId: data.companyId as Id<"companies">,
      routeId: data.routeId as Id<"routes">,
      touchPoint: data.touchPoint || undefined,
      typeId: data.typeId as Id<"trip_types">,
      routeTypeId: data.routeTypeId as Id<"route_types">,
      vehicleId: data.vehicleId as Id<"vehicles">,
      driverId: data.driverId as Id<"app_users">,
      tripId: data.tripId || undefined,
      tripSheet: data.tripSheet === true ? true : undefined,
      cost: data.cost ?? undefined,
    };

    const result = await withErrorHandling(
      async () => {
        if (id) {
          // update expects { id, patch }
          return await updateTrip({ id, patch: payload });
        }
        return await createTrip(payload);
      },
      { successMessage: id ? "Trip updated" : "Trip created" },
    );

    setIsLoading(false);
    if (result) {
      form.reset();
      onSuccess?.();
    }
  };

  const isEdit = !!id;
  const buttonText = React.useMemo(() => {
    if (isEdit) return isLoading ? "Updating..." : "Update Trip";
    return isLoading ? "Creating..." : "Create Trip";
  }, [isEdit, isLoading]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Trip Details</h3>

          <DateTimePickerDialog
            value={form.watch("dateTime")}
            onChange={(d) => form.setValue("dateTime", d ?? new Date())}
          />

          <SearchableCombobox
            control={form.control}
            name="companyId"
            label="Company"
            options={companyOptions}
            placeholder="Select company"
            emptyMessage="No companies"
          />

          <SearchableCombobox
            control={form.control}
            name="routeId"
            label="Route"
            options={routeOptions}
            placeholder="Select route"
            emptyMessage="No routes"
          />

          <FormField
            control={form.control}
            name="touchPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Touch point</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Gate A entry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SearchableCombobox
            control={form.control}
            name="typeId"
            label="Trip Type"
            options={tripTypeOptions}
            placeholder="Select trip type"
            emptyMessage="No trip types"
          />

          <SearchableCombobox
            control={form.control}
            name="routeTypeId"
            label="Route Type"
            options={routeTypeOptions}
            placeholder="Select route type"
            emptyMessage="No route types"
          />

          <SearchableCombobox
            control={form.control}
            name="vehicleId"
            label="Vehicle"
            options={vehicleOptions}
            placeholder="Select vehicle"
            emptyMessage="No vehicles"
          />

          <SearchableCombobox
            control={form.control}
            name="driverId"
            label="Driver"
            options={driverOptions}
            placeholder="Select driver"
            emptyMessage="No drivers"
          />

          <FormField
            control={form.control}
            name="tripId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip Reference</FormLabel>
                <FormControl>
                  <Input placeholder="Optional trip reference" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tripSheet"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={!!field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                </FormControl>
                <FormLabel className="m-0">Trip sheet present</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => onCancel?.()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

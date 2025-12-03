"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { withErrorHandling } from "@/lib/error-handler";
import { Id } from "@/convex/_generated/dataModel";

const TripTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  sortBy: z.number().optional(),
});

export type TripTypeFormValues = z.infer<typeof TripTypeSchema>;

export default function TripTypeForm({
  id,
  onSuccess,
}: Readonly<{
  id?: Id<"trip_types">;
  onSuccess?: (id: Id<"trip_types">) => void;
}>) {
  const createTripType = useMutation(api.tripType.createTripType);
  const updateTripType = useMutation(api.tripType.updateTripType);

  const form = useForm<TripTypeFormValues>({
    resolver: zodResolver(TripTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      sortBy: undefined,
    },
  });

  const handleUpdate = async (data: TripTypeFormValues) => {
    if (!id) return;

    const res = await withErrorHandling(() => updateTripType({ id, ...data }), {
      loadingMessage: "Updating trip type...",
      successMessage: "Trip type updated",
      errorMessage: "Failed to update",
    });
    if (res && onSuccess) onSuccess(id);
  };

  const handleCreate = async (data: TripTypeFormValues) => {
    const res = await withErrorHandling(() => createTripType(data), {
      loadingMessage: "Creating trip type...",
      successMessage: "Trip type created",
      errorMessage: "Failed to create",
    });
    if (res && onSuccess) onSuccess(res);
  };

  const onSubmit = async (data: TripTypeFormValues) => {
    if (id) await handleUpdate(data);
    else await handleCreate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Eg: Adhoc" {...field} />
              </FormControl>
              <FormDescription>This will be used as the trip type code as well.</FormDescription>
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
                <Textarea placeholder="Eg: This is a trip type" {...field} />
              </FormControl>
              <FormDescription>This will be used as the trip type description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sortBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

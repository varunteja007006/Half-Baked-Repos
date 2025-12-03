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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/features/auth";
import { cn } from "@/lib/utils";
import { withErrorHandling } from "@/lib/error-handler";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  assignedVehicle: z.string().min(1).max(100).optional(),
});

export default function ProfileForm({ className }: Readonly<{ className?: string }>) {
  const { user: loggedInUser } = useAuth();
  const appUser = loggedInUser?.appUser;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      assignedVehicle: undefined,
    },
  });

  const updateUser = useMutation(api.appUser.updateUserName);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await withErrorHandling(
      () =>
        updateUser({
          name: values.name,
        }),
      {
        loadingMessage: "Updating profile...",
        successMessage: "Profile updated successfully",
        errorMessage: "Failed to update profile",
      },
    );
  }

  React.useEffect(() => {
    if (appUser?.name) {
      form.reset({
        name: appUser.name,
      });
    }
  }, [appUser, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn("space-y-6", className)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Driver Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row w-full items-center justify-center">
          <Button className="cursor-pointer" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

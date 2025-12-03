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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { withErrorHandling } from "@/lib/error-handler";

// Define the available roles based on the schema
const ROLES = [
  { id: "driver", label: "Driver", description: "Can manage trips and vehicle assignments" },
  { id: "admin", label: "Admin", description: "Can manage users and system settings" },
  { id: "super", label: "Super Admin", description: "Full system access" },
] as const;

const formSchema = z.object({
  roles: z.array(z.enum(["driver", "admin", "super"])).min(0, "Select at least one role"),
});

interface UserRoleAssignmentProps {
  appUserId: Id<"app_users">;
  className?: string;
  onSuccess?: () => void;
}

export default function UserRoleAssignment({
  appUserId,
  className,
  onSuccess,
}: Readonly<UserRoleAssignmentProps>) {
  const [isLoading, setIsLoading] = React.useState(false);

  // Get single user with roles instead of fetching all users
  const targetUser = useQuery(api.appUser.adminGetUser, { appUserId });
  const currentRoles = React.useMemo(
    () => targetUser?.userRoles?.map((role) => role.role) || [],
    [targetUser],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: currentRoles,
    },
  });

  // Update form when user data is loaded
  React.useEffect(() => {
    if (currentRoles.length > 0) {
      form.reset({ roles: currentRoles });
    }
  }, [currentRoles, form]);

  const upsertUserRoles = useMutation(api.appUser.upsertUserRoles);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await withErrorHandling(
      () =>
        upsertUserRoles({
          targetAppUserId: appUserId,
          roles: values.roles,
        }),
      {
        loadingMessage: "Updating user roles...",
        successMessage: "User roles updated successfully",
        errorMessage: "Failed to update user roles",
      },
    );

    if (result) {
      onSuccess?.();
    }
    setIsLoading(false);
  }

  if (!targetUser) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Loading user information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Assign User Roles</CardTitle>
        <CardDescription>
          Manage roles for {targetUser.appUser.name || targetUser.user?.email || "Unknown User"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">User Roles</FormLabel>
                    <FormDescription>
                      Select the roles you want to assign to this user.
                    </FormDescription>
                  </div>
                  <div className="space-y-4">
                    {ROLES.map((role) => (
                      <FormField
                        key={role.id}
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, role.id])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== role.id),
                                        );
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-medium">{role.label}</FormLabel>
                                <FormDescription className="text-xs">
                                  {role.description}
                                </FormDescription>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row w-full items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Current roles: {currentRoles.length > 0 ? currentRoles.join(", ") : "None"}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Roles"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

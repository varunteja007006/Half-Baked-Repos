"use client";

import React from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { withErrorHandling } from "@/lib/error-handler";

interface UserDeleteDialogProps {
  appUserId: Id<"app_users">;
  children?: React.ReactNode;
  onSuccess?: () => void;
  disabled?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UserDeleteDialog({
  appUserId,
  children,
  onSuccess,
  disabled = false,
  open,
  setOpen,
}: Readonly<UserDeleteDialogProps>) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Get user data to display in confirmation dialog
  const adminListUsers = useQuery(api.appUser.adminListUsers, { onlyActive: true });
  const targetUser = adminListUsers?.find((user) => user.appUser._id === appUserId);

  const softDeleteUser = useMutation(api.appUser.softDeleteUser);

  const handleDelete = async () => {
    if (!targetUser) return;

    // Prevent multiple simultaneous delete requests
    if (isDeleting) return;

    setIsDeleting(true);

    const result = await withErrorHandling(
      () =>
        softDeleteUser({
          targetAppUserId: appUserId,
        }),
      {
        loadingMessage: "Deleting user...",
        successMessage: "User deleted successfully",
        errorMessage: "Failed to delete user",
        loadingToastId: `delete-user-${appUserId}`, // Unique ID for proper cleanup
      },
    );

    setIsDeleting(false);

    if (result) {
      setOpen(false);
      onSuccess?.();
    }
  };

  const defaultTrigger = (
    <Button variant="destructive" size="sm" disabled={disabled} className="h-8 w-8 p-0">
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete user</span>
    </Button>
  );

  const userName = targetUser?.appUser.name || targetUser?.user?.email || "Unknown User";
  const userRoles = targetUser?.roles?.map((role) => role.role).join(", ") || "No roles";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children || defaultTrigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete User Account
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-2">
          <p>
            Are you sure you want to delete the account for{" "}
            <span className="font-semibold">{userName}</span>?
          </p>
          <div className="rounded-md bg-muted p-3 text-sm">
            <p>
              <strong>User:</strong> {userName}
            </p>
            <p>
              <strong>Current Roles:</strong> {userRoles}
            </p>
          </div>
          <p className="text-destructive font-medium">This action will:</p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Soft delete the user account (can be restored)</li>
            <li>Deactivate all assigned roles</li>
            <li>Prevent the user from accessing the system</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            This action can be reversed by a system administrator.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

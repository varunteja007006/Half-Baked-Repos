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

interface DeleteRouteTypeDialogProps {
  routeTypeId: Id<"route_types">;
  children?: React.ReactNode;
  onSuccess?: () => void;
  disabled?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DeleteRouteTypeDialog({
  routeTypeId,
  children,
  onSuccess,
  disabled = false,
  open,
  setOpen,
}: Readonly<DeleteRouteTypeDialogProps>) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Get route type data to display in confirmation dialog
  const routeType = useQuery(api.routeType.getRouteType, { id: routeTypeId });

  const deleteRouteType = useMutation(api.routeType.deleteRouteType);

  const handleDelete = async () => {
    if (!routeType) return;

    // Prevent multiple simultaneous delete requests
    if (isDeleting) return;

    setIsDeleting(true);

    const result = await withErrorHandling(() => deleteRouteType({ id: routeTypeId }), {
      loadingMessage: "Deleting route type...",
      successMessage: "Route type deleted successfully",
      errorMessage: "Failed to delete route type",
      loadingToastId: `delete-route-type-${routeTypeId}`,
    });

    setIsDeleting(false);

    if (result) {
      setOpen(false);
      onSuccess?.();
    }
  };

  const defaultTrigger = (
    <Button variant="destructive" size="sm" disabled={disabled} className="h-8 w-8 p-0">
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete route type</span>
    </Button>
  );

  const routeTypeName = routeType?.name || "Unknown Route Type";
  const routeTypeDescription = routeType?.description || "No description";
  const isDefault = routeType?.isDefault || false;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children || defaultTrigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Route Type
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-2">
          <div>
            Are you sure you want to delete the route type{" "}
            <span className="font-semibold">{routeTypeName}</span>?
          </div>
          <div className="rounded-md bg-muted p-3 text-sm">
            <div>
              <strong>Name:</strong> {routeTypeName}
            </div>
            <div>
              <strong>Description:</strong> {routeTypeDescription}
            </div>
            <div>
              <strong>Type:</strong> {isDefault ? "Default" : "Custom"}
            </div>
          </div>
          {isDefault && (
            <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
              <div className="font-medium">⚠️ Warning: Default Route Type</div>
              <div>This is a default route type and cannot be deleted.</div>
            </div>
          )}
          <div className="text-destructive font-medium">This action will:</div>
          <ul className="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Permanently delete the route type</li>
            <li>This action cannot be undone</li>
            <li>Routes using this type will need to be updated</li>
          </ul>
          <div className="text-sm text-muted-foreground">
            Make sure no active routes are using this route type before deleting.
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting || isDefault}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Route Type"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Eye, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { RouteTableRow } from "./RouteTable";
import { EditRouteDialog } from "../EditRoute";

export const columns: ColumnDef<RouteTableRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Route Name",
    cell: ({ getValue, row }) => {
      const name = getValue() as string;
      const routeTypeName = row.original.routeTypeName;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-sm text-muted-foreground">{routeTypeName}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.startAddress,
    id: "startLocation",
    header: "Start Location",
    cell: ({ getValue, row }) => {
      const startAddress = getValue() as string;
      const startLocation = row.original.startLocation;
      return (
        <div className="flex flex-col">
          <span className="text-sm">{startAddress}</span>
          <span className="text-xs text-muted-foreground">{startLocation}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.endAddress,
    id: "endLocation",
    header: "End Location",
    cell: ({ getValue, row }) => {
      const endAddress = getValue() as string;
      const endLocation = row.original.endLocation;
      return (
        <div className="flex flex-col">
          <span className="text-sm">{endAddress}</span>
          <span className="text-xs text-muted-foreground">{endLocation}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.distance,
    id: "distance",
    header: "Distance",
    cell: ({ getValue }) => {
      const distance = getValue() as number | undefined;
      return distance ? `${distance} km` : "—";
    },
  },
  {
    accessorFn: (row) => row.baseAmount,
    id: "baseAmount",
    header: "Base Amount",
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return `₹${amount.toLocaleString()}`;
    },
  },
  {
    accessorFn: (row) => row.estimatedDuration,
    id: "estimatedDuration",
    header: "Duration",
    cell: ({ getValue }) => {
      const duration = getValue() as number | undefined;
      if (!duration) return "—";

      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    },
  },
  {
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: "Created",
    cell: ({ getValue }) => {
      const v = getValue();
      return v ? new Date(v as number).toLocaleString() : "—";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const route = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* View Route */}
            <ViewRouteAction routeId={route.id as Id<"routes">} />

            {/* Edit Route */}
            <EditRouteDialog routeId={route.id as Id<"routes">}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Route
              </DropdownMenuItem>
            </EditRouteDialog>

            <DropdownMenuSeparator />

            {/* Delete Route */}
            <DeleteRouteAction routeId={route.id as Id<"routes">} routeName={route.name} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function ViewRouteAction({ routeId }: Readonly<{ routeId: Id<"routes"> }>) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/dashboard/routes/${routeId}`);
  };

  return (
    <DropdownMenuItem onClick={handleView} className="flex items-center gap-2">
      <Eye className="h-4 w-4" />
      View Route
    </DropdownMenuItem>
  );
}

function DeleteRouteAction({
  routeId,
  routeName,
}: Readonly<{
  routeId: Id<"routes">;
  routeName: string;
}>) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteRoute = useMutation(api.route.deleteRoute);

  const handleDelete = async () => {
    // Prevent multiple simultaneous delete requests
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteRoute({ id: routeId });
      toast.success("Route deleted successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error deleting route:", error);
      toast.error("Failed to delete route");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="text-destructive focus:text-destructive flex items-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Delete Route
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Route
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the route{" "}
              <span className="font-semibold">&quot;{routeName}&quot;</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <div className="text-destructive font-medium">This action will:</div>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Permanently delete the route</li>
              <li>Remove all associated route data</li>
              <li>This action cannot be undone</li>
            </ul>
            <div className="text-sm text-muted-foreground">
              Make sure no active trips are using this route before deleting.
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Route"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

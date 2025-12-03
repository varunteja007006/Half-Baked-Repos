import React from "react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { VehicleTableRow } from "./VehicleTable";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";

// Vehicle type display names
const VEHICLE_TYPE_LABELS = {
  car: "Car",
  truck: "Truck",
  "maxi-cab": "Maxi-Cab",
  van: "Van",
  bus: "Bus",
  motorcycle: "Motorcycle",
  pickup: "Pickup",
  suv: "SUV",
} as const;

// Vehicle type colors
const VEHICLE_TYPE_COLORS = {
  car: "bg-blue-100 text-blue-800",
  truck: "bg-green-100 text-green-800",
  "maxi-cab": "bg-yellow-100 text-yellow-800",
  van: "bg-purple-100 text-purple-800",
  bus: "bg-orange-100 text-orange-800",
  motorcycle: "bg-red-100 text-red-800",
  pickup: "bg-indigo-100 text-indigo-800",
  suv: "bg-pink-100 text-pink-800",
} as const;

export const columns: ColumnDef<VehicleTableRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Model",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorFn: (row) => row.manufacturer,
    id: "manufacturer",
    header: "Manufacturer",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.manufacturer}</span>,
  },
  {
    accessorFn: (row) => row.type,
    id: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type as keyof typeof VEHICLE_TYPE_LABELS;
      return (
        <Badge variant="secondary" className={`${VEHICLE_TYPE_COLORS[type]} border-0`}>
          {VEHICLE_TYPE_LABELS[type]}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.fuelType,
    id: "fuelType",
    header: "Fuel",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.fuelType}</span>
    ),
  },
  {
    accessorFn: (row) => row.capacity,
    id: "capacity",
    header: "Capacity",
    cell: ({ row }) => {
      const capacity = row.original.capacity;
      return capacity ? (
        <span className="font-mono text-sm">{capacity}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorFn: (row) => row.year,
    id: "year",
    header: "Year",
    cell: ({ row }) => {
      const year = row.original.year;
      return year ? (
        <span className="font-mono text-sm">{year}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorFn: (row) => row.engineSize,
    id: "engineSize",
    header: "Engine",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.engineSize}</span>
    ),
  },
  {
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: "Created",
    cell: ({ getValue }) => {
      const v = getValue();
      return v ? new Date(v as number).toLocaleDateString() : "—";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;

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
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/vehicle/models/${vehicle.id}`}>Edit Model</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/vehicle/models/${vehicle.id}/details`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteVehicle vehicleId={vehicle.id as Id<"vehicle_models">} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteVehicle({ vehicleId }: Readonly<{ vehicleId: Id<"vehicle_models"> }>) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteVehicle = useMutation(api.vehicle.deleteModel);

  const handleDelete = async () => {
    // Prevent multiple simultaneous delete requests
    if (isDeleting) return;

    setIsDeleting(true);

    const result = await withErrorHandling(() => deleteVehicle({ id: vehicleId }), {
      loadingMessage: "Deleting vehicle model...",
      successMessage: "Vehicle model deleted successfully",
      errorMessage: "Failed to delete vehicle model",
      loadingToastId: `delete-vehicle-${vehicleId}`, // Unique ID for proper cleanup
    });

    setIsDeleting(false);

    if (result) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
          className="text-destructive focus:text-destructive"
        >
          Delete Model
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Vehicle Model</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this vehicle model? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

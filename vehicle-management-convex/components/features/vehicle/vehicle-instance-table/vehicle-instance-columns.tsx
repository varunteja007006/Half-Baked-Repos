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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal, Edit, Trash2, FileText, Calendar, Car } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { VehicleInstanceTableRow } from "./VehicleInstanceTable";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";
import VehicleForm from "../VehicleForm";

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

// Function to format dates
const formatDate = (timestamp: number | null) => {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleDateString();
};

// Function to check if date is expired or expiring soon
const getExpiryStatus = (timestamp: number | null) => {
  if (!timestamp) return null;

  const now = new Date();
  const expiryDate = new Date(timestamp);
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "expiring";
  return "valid";
};

// Function to get badge variant based on expiry status
const getBadgeVariant = (status: string | null) => {
  if (status === "expired") return "destructive";
  if (status === "expiring") return "secondary";
  return "outline";
};

// Actions component for each row
function ActionsCell({ vehicle }: { vehicle: VehicleInstanceTableRow }) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const deleteVehicle = useMutation(api.vehicle.deleteVehicle);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    await withErrorHandling(
      async () => {
        await deleteVehicle({ id: vehicle.id as Id<"vehicles"> });
      },
      {
        loadingMessage: "Deleting vehicle...",
        successMessage: "Vehicle deleted successfully",
        errorMessage: "Failed to delete vehicle",
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(vehicle.plate)}>
            Copy plate number
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/super/vehicles/${vehicle.id}`}>
              <Car className="mr-2 h-4 w-4" />
              View details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit vehicle
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/super/vehicles/${vehicle.id}/documents`}>
              <FileText className="mr-2 h-4 w-4" />
              Manage documents
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vehicle: {vehicle.plate}</DialogTitle>
            <DialogDescription>Update the vehicle information below.</DialogDescription>
          </DialogHeader>
          <VehicleForm
            vehicleId={vehicle.id as Id<"vehicles">}
            onSuccess={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columns: ColumnDef<VehicleInstanceTableRow>[] = [
  {
    accessorKey: "plate",
    header: "Plate Number",
    cell: ({ row }) => <div className="font-medium">{row.getValue("plate")}</div>,
  },
  {
    accessorKey: "modelName",
    header: "Model",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("modelName")}</div>
        <div className="text-sm text-muted-foreground">{row.original.manufacturerName}</div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as keyof typeof VEHICLE_TYPE_LABELS;
      return <Badge variant="outline">{VEHICLE_TYPE_LABELS[type] || type}</Badge>;
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.getValue("color") as string | null;

      if (!color) {
        return <div className="text-sm text-muted-foreground">—</div>;
      }

      return (
        <div className="flex items-center gap-2 text-sm">
          <div
            className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
            style={{ backgroundColor: color }}
            title={`Vehicle color: ${color}`}
          />
          <span className="font-mono text-xs text-muted-foreground">{color}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      const year = row.getValue("year") as number | null;
      return <div className="text-sm">{year || "—"}</div>;
    },
  },
  {
    accessorKey: "mileage",
    header: "Mileage (km)",
    cell: ({ row }) => {
      const mileage = row.getValue("mileage") as number | null;
      return <div className="text-sm">{mileage ? mileage.toLocaleString() : "—"}</div>;
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;
      return (
        <Badge variant={active ? "default" : "secondary"}>{active ? "Active" : "Inactive"}</Badge>
      );
    },
  },
  {
    accessorKey: "insuranceExpiry",
    header: "Insurance",
    cell: ({ row }) => {
      const insuranceExpiry = row.original.insuranceExpiry;
      const status = getExpiryStatus(insuranceExpiry);

      const getBadgeText = (status: string | null) => {
        if (status === "expired") return "Expired";
        if (status === "expiring") return "Expiring Soon";
        return "Valid";
      };

      return (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(insuranceExpiry)}
          </div>
          {status && (
            <Badge variant={getBadgeVariant(status)} className="text-xs mt-1">
              {getBadgeText(status)}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "nextServiceDue",
    header: "Next Service",
    cell: ({ row }) => {
      const nextServiceDue = row.original.nextServiceDue;
      const status = getExpiryStatus(nextServiceDue);

      const getBadgeText = (status: string | null) => {
        if (status === "expired") return "Overdue";
        if (status === "expiring") return "Due Soon";
        return "Scheduled";
      };

      return (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(nextServiceDue)}
          </div>
          {status && (
            <Badge variant={getBadgeVariant(status)} className="text-xs mt-1">
              {getBadgeText(status)}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Added",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as number;
      return <div className="text-sm text-muted-foreground">{formatDate(createdAt)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell vehicle={row.original} />,
  },
];

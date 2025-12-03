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
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface TripV1Row {
  id: string;
  date?: number | null;
  companyId?: string | null;
  companyName?: string | null;
  routeId?: string | null;
  routeName?: string | null;
  tripId?: string | null;
  typeId?: string | null;
  routeTypeId?: string | null;
  vehicleId?: string | null;
  driverId?: string | null;
  driverName?: string | null;
  vehicleName?: string | null;
  cost?: number | null;
  createdAt?: number | null;
  isActive?: boolean | null;
}

export const columns: ColumnDef<TripV1Row>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row.date,
    id: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const v = getValue();
      return v ? new Date(v as number).toLocaleString() : "—";
    },
  },
  {
    accessorFn: (row) => row.companyName,
    id: "companyName",
    header: "Company",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.companyName || "—"}</div>
    ),
  },
  {
    accessorFn: (row) => row.routeName,
    id: "routeName",
    header: "Route",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.routeName || "—"}</div>,
  },
  {
    accessorFn: (row) => row.driverName,
    id: "driverName",
    header: "Driver",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.driverName || "—"}</div>
    ),
  },
  {
    accessorFn: (row) => row.vehicleName,
    id: "vehicleName",
    header: "Vehicle",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.vehicleName || "—"}</div>
    ),
  },
  {
    accessorFn: (row) => row.tripId,
    id: "tripId",
    header: "Trip Ref",
    cell: ({ row }) => <div>{row.original.tripId || "—"}</div>,
  },
  {
    accessorFn: (row) => row.cost,
    id: "cost",
    header: "Cost",
    cell: ({ getValue }) => {
      const v = getValue();
      return typeof v === "number" ? <span className="font-mono">{v.toFixed(2)}</span> : "—";
    },
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
    accessorFn: (row) => row.isActive,
    id: "isActive",
    header: "Status",
    cell: ({ getValue }) => {
      const v = getValue();
      return <Badge variant={v ? "default" : "destructive"}>{v ? "Active" : "Inactive"}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tr = row.original;
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
              <Link href={`/dashboard/super/trips-management/${tr.id}`}>View Trip</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/super/trips-management/${tr.id}`}>Edit Trip</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteTrip tripId={tr.id as Id<"trip_v1">} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteTrip({ tripId }: Readonly<{ tripId: Id<"trip_v1"> }>) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteTrip = useMutation(api.trip_v1.deleteTripV1);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    const result = await withErrorHandling(() => deleteTrip({ id: tripId }), {
      loadingMessage: "Deleting trip...",
      successMessage: "Trip deleted",
      errorMessage: "Failed to delete trip",
    });

    setIsDeleting(false);
    if (result) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="text-destructive focus:text-destructive"
        >
          Delete Trip
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Trip</DialogTitle>
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

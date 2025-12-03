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

export interface TripTypeRow {
  id: string;
  code: string;
  name: string;
  description?: string;
  sortBy?: number | null;
  createdAt?: number | null;
}

export const columns: ColumnDef<TripTypeRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorFn: (row) => row.code,
    id: "code",
    header: "Code",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.code}</div>,
  },
  {
    accessorFn: (row) => row.description,
    id: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.description || "—"}</div>
    ),
  },
  {
    accessorFn: (row) => row.sortBy,
    id: "sortBy",
    header: "Sort",
    cell: ({ getValue }) => {
      const v = getValue();
      if (typeof v === "number") return <span className="font-mono">{v}</span>;
      return "—";
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
    id: "actions",
    cell: ({ row }) => {
      const tt = row.original;
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
              <Link href={`/dashboard/trips/types/${tt.id}`}>Edit Trip Type</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteTripType tripTypeId={tt.id as Id<"trip_types">} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteTripType({ tripTypeId }: Readonly<{ tripTypeId: Id<"trip_types"> }>) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteTripType = useMutation(api.tripType.deleteTripType);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    const result = await withErrorHandling(() => deleteTripType({ id: tripTypeId }), {
      loadingMessage: "Deleting trip type...",
      successMessage: "Trip type deleted successfully",
      errorMessage: "Failed to delete trip type",
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
          Delete Trip Type
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Trip Type</DialogTitle>
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

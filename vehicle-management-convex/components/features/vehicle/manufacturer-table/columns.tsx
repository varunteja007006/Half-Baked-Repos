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

import { MoreHorizontal, ExternalLink } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ManufacturerTableRow } from "./ManufacturerTable";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";

export const columns: ColumnDef<ManufacturerTableRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Manufacturer",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorFn: (row) => row.country,
    id: "country",
    header: "Country",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.country}</span>,
  },
  {
    accessorFn: (row) => row.website,
    id: "website",
    header: "Website",
    cell: ({ row }) => {
      const website = row.original.website;
      if (website === "—" || !website) {
        return <span className="text-muted-foreground">—</span>;
      }
      return (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Visit
        </a>
      );
    },
  },
  {
    accessorFn: (row) => row.modelsCount,
    id: "modelsCount",
    header: "Models",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.original.modelsCount}
      </Badge>
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
      const manufacturer = row.original;

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
              <Link href={`/dashboard/vehicle/manufacturers/${manufacturer.id}`}>
                Edit Manufacturer
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/vehicle/models?manufacturer=${manufacturer.id}`}>
                View Models ({manufacturer.modelsCount})
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteManufacturer manufacturerId={manufacturer.id as Id<"vehicle_manufacturers">} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteManufacturer({
  manufacturerId,
}: Readonly<{ manufacturerId: Id<"vehicle_manufacturers"> }>) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteManufacturer = useMutation(api.vehicle.deleteManufacturer);

  const handleDelete = async () => {
    // Prevent multiple simultaneous delete requests
    if (isDeleting) return;

    setIsDeleting(true);

    const result = await withErrorHandling(() => deleteManufacturer({ id: manufacturerId }), {
      loadingMessage: "Deleting manufacturer...",
      successMessage: "Manufacturer deleted successfully",
      errorMessage: "Failed to delete manufacturer",
      loadingToastId: `delete-manufacturer-${manufacturerId}`, // Unique ID for proper cleanup
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
          Delete Manufacturer
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Manufacturer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this manufacturer? This action cannot be undone. All
            associated vehicle models will also be deleted.
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

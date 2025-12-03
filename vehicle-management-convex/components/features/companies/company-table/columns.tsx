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
import { MoreHorizontal, MapPin, Phone, Mail } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { CompanyTableRow } from "./CompanyTable";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";

export const columns: ColumnDef<CompanyTableRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
        <span className="text-sm text-muted-foreground">{row.original.companyType}</span>
      </div>
    ),
  },
  {
    accessorKey: "contactPersonName",
    header: "Contact Person",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.contactPersonName}</span>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {row.original.contactPersonEmail !== "—" && (
            <>
              <Mail className="h-3 w-3" />
              <span>{row.original.contactPersonEmail}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {row.original.contactPersonPhone !== "—" && (
            <>
              <Phone className="h-3 w-3" />
              <span>{row.original.contactPersonPhone}</span>
            </>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const city = row.original.city;
      const state = row.original.state;
      const location = [city, state].filter((item) => item !== "—").join(", ");

      return (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{location || "—"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "gstNumber",
    header: "GST Number",
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("gstNumber")}</span>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => {
      const value = getValue() as number | null;
      return value ? new Date(value).toLocaleDateString() : "—";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;

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
            <Link href={`/dashboard/companies/${company.id}`}>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/companies/${company.id}/edit`}>
              <DropdownMenuItem>Edit Company</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DeleteCompany companyId={company.id as Id<"companies">} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteCompany({ companyId }: Readonly<{ companyId: Id<"companies"> }>) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteCompany = useMutation(api.company.deleteCompany);

  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await withErrorHandling(
      async () => {
        await deleteCompany({ id: companyId });
      },
      {
        loadingMessage: "Deleting company...",
        successMessage: "Company deleted successfully",
        errorMessage: "Failed to delete company",
      },
    );

    if (result !== null) {
      setOpen(false);
    }
    setIsDeleting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="text-destructive focus:text-destructive"
        >
          Delete Company
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this company? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
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

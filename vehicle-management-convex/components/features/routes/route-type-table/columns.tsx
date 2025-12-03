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

import { MoreHorizontal } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { RouteTypeTableRow } from "./RouteTypeTable";
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { UpdateRouteTypeDialog } from "../UpdateRouteType";
import DeleteRouteTypeDialog from "../DeleteRouteType";

export const columns: ColumnDef<RouteTypeTableRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => row.description,
    id: "description",
    header: "Description",
  },
  {
    accessorFn: (row) => row.companyName,
    id: "company",
    header: "Company",
    cell: ({ getValue }) => {
      const companyName = getValue() as string;
      return (
        <Badge variant={companyName === "Global" ? "outline" : "secondary"}>{companyName}</Badge>
      );
    },
  },
  //   {
  //     accessorFn: (row) => row.isDefault,
  //     id: "type",
  //     header: "Type",
  //     cell: ({ getValue }) => {
  //       const isDefault = getValue() as boolean;
  //       return (
  //         <Badge variant={isDefault ? "default" : "secondary"}>
  //           {isDefault ? "Default" : "Custom"}
  //         </Badge>
  //       );
  //     },
  //   },
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
      const routeType = row.original;

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

            {/* Edit Route Type */}
            <EditRouteTypeDialog routeTypeId={routeType.id as Id<"route_types">} />

            <DropdownMenuSeparator />

            {/* Delete Route Type - Only for non-default types */}
            {!routeType.isDefault && (
              <DeleteRouteType routeTypeId={routeType.id as Id<"route_types">} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteRouteType({ routeTypeId }: Readonly<{ routeTypeId: Id<"route_types"> }>) {
  const [open, setOpen] = React.useState(false);

  return (
    <DeleteRouteTypeDialog routeTypeId={routeTypeId} open={open} setOpen={setOpen}>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="text-destructive focus:text-destructive"
      >
        Delete Route Type
      </DropdownMenuItem>
    </DeleteRouteTypeDialog>
  );
}

function EditRouteTypeDialog({ routeTypeId }: Readonly<{ routeTypeId: Id<"route_types"> }>) {
  const [open, setOpen] = React.useState(false);

  return (
    <UpdateRouteTypeDialog routeTypeId={routeTypeId} open={open} setOpen={setOpen}>
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        Edit Route Type
      </DropdownMenuItem>
    </UpdateRouteTypeDialog>
  );
}

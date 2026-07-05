import React from "react";

import { Badge } from "@/components/ui/badge";
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

import { MoreHorizontal } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { UserTableRow } from "@/lib/types/user";
import { UserDeleteDialog, UserRoleAssignment } from "@/components/features/user";
import { Id } from "@/convex/_generated/dataModel";

export const columns: ColumnDef<UserTableRow>[] = [
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
    accessorFn: (row) => row.email,
    id: "email",
    header: "Email",
  },
  {
    accessorFn: (row) => row.roles,
    id: "roles",
    header: "Roles",
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
    accessorFn: (row) => row.isActive,
    id: "isActive",
    header: "Status",
    cell: ({ getValue }) => {
      const active = getValue() as boolean;
      return (
        <Badge variant={active ? "default" : "secondary"}>{active ? "Active" : "Inactive"}</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
            <Link href={`/dashboard/super/users/${user.id}`}>
              <DropdownMenuItem>View User</DropdownMenuItem>
            </Link>
            <UserRoleDialog appUserId={user.id} />
            <DropdownMenuSeparator />
            <DeleteUser appUserId={user.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DeleteUser({ appUserId }: Readonly<{ appUserId: Id<"app_users"> }>) {
  const [open, setOpen] = React.useState(false);
  return (
    <UserDeleteDialog appUserId={appUserId} open={open} setOpen={setOpen}>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="text-destructive focus:text-destructive"
      >
        Delete User
      </DropdownMenuItem>
    </UserDeleteDialog>
  );
}

function UserRoleDialog({ appUserId }: Readonly<{ appUserId: Id<"app_users"> }>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          Manage Roles
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <UserRoleAssignment appUserId={appUserId} />
      </DialogContent>
    </Dialog>
  );
}

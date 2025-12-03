"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Faker, faker } from "@faker-js/faker";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/atom/data-table/data-table-column-header";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  address?: string;
  customerName?: string;
  vehicle?: string;
  method?: string;
  createdAt?: string;
  phone?: string;
  reference?: string;
  notes?: string;
  mileage?: number;
};

export const payments: Payment[] = generatePayments(50);

function generatePayments(count: number): Payment[] {
  const statuses = ["pending", "processing", "success", "failed"] as const;
  const methods = ["Card", "Cash", "Online", "Transfer", "Mobile"] as const;

  const f: Faker = faker;

  return Array.from({ length: count }).map(() => {
    const first = f.person?.firstName?.() ?? "Alex";
    const last = f.person?.lastName?.() ?? "Smith";
    const customerName = `${first} ${last}`;
    const id = f.string?.uuid?.() ?? `${Date.now()}`;
    const amount = parseFloat(
      (
        f.finance?.amount?.({ min: 100, max: 2500 }) ?? (Math.random() * 2500 + 10).toFixed(2)
      ).toString(),
    );
    const status =
      f.helpers?.arrayElement?.(statuses) ?? statuses[Math.floor(Math.random() * statuses.length)];
    const method =
      f.helpers?.arrayElement?.(methods) ?? methods[Math.floor(Math.random() * methods.length)];
    const email = (
      f.internet?.email?.({ firstName: first, lastName: last }) ?? `${first}.${last}@example.com`
    ).toLowerCase();
    const vehicleModel = f.vehicle?.model?.() ?? `${f.vehicle?.type?.() ?? "Car"} Model`;
    const plate = f.vehicle?.vin?.()?.slice(0, 8) ?? `PL${Math.floor(Math.random() * 9000) + 1000}`;
    const vehicle = `${vehicleModel} (${plate})`;
    const createdAt =
      f.date?.recent?.({ days: 365 })?.toISOString?.() ??
      new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString();
    const address = f.location?.streetAddress?.();
    const phone = f.phone?.number?.() ?? "(000) 000-0000";
    const reference =
      (f.finance?.transactionType?.() ?? "TX") +
      "-" +
      (f.string.alpha(10) ?? Math.floor(Math.random() * 1000000));
    const notes = f.lorem?.sentence?.() ?? "-";
    const mileage = Math.floor(Math.random() * 200000);

    return {
      id,
      amount,
      status,
      email,
      customerName,
      vehicle,
      method,
      createdAt,
      address,
      phone,
      reference,
      notes,
      mileage,
    };
  });
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => <div className="truncate max-w-xs">{row.getValue("vehicle")}</div>,
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const val = row.getValue("createdAt");
      if (!val) return <span>-</span>;
      const d = new Date(String(val));
      return <div className="text-right">{d.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  ColumnSizingState,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/atom/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/atom/data-table/data-table-column-toggle";
import { ColumnResizer } from "@/components/atom/data-table/column-resizer";
import { DebouncedInput } from "@/components/atom";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  filterComponent?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  filterComponent,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [colSizing, setColSizing] = React.useState<ColumnSizingState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnSizingChange: setColSizing,
    enableColumnResizing: false,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnSizing: colSizing,
      globalFilter,
    },
  });

  return (
    <div className="w-full border p-2 rounded space-y-4 bg-card">
      <div className="flex items-center justify-between mb-2">
        <DebouncedInput
          placeholder="Search all..."
          value={globalFilter ?? ""}
          onChange={(str: string) => setGlobalFilter(str)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          {filterComponent}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <Table style={{ width: table.getTotalSize(), minWidth: "100%" }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    <ColumnResizer header={header} />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original)}
                className={cn(onRowClick && "cursor-pointer hover:bg-muted/50")}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}

"use client";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Student } from "./types";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const defaultData: Student[] = [
  {
    studentId: 1111,
    name: "Bahar Constantia",
    dateOfBirth: "1984-01-04",
    major: "Computer Science",
  },
  {
    studentId: 2222,
    name: "Harold Nona",
    dateOfBirth: "1961-05-10",
    major: "Communications",
  },
  {
    studentId: 3333,
    name: "Raginolf Arnulf",
    dateOfBirth: "1991-10-12",
    major: "Business",
  },
  {
    studentId: 4444,
    name: "Marvyn Wendi",
    dateOfBirth: "1978-09-24",
    major: "Psychology",
  },
];

const EditableTable = () => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [originalData, setOriginalData] = React.useState(() => [
    ...defaultData,
  ]);
  const [editedRows, setEditedRows] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>React Table</CardTitle>
        <CardDescription>
          This react table has in-line edit feature
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of your students</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EditableTable;

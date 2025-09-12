import EditCell from "./EditCell";
import TableCell from "./TableCell";
import { createColumnHelper } from "@tanstack/react-table";
import { Student } from "./types";

const columnHelper = createColumnHelper<Student>();

export const columns = [
  columnHelper.accessor("studentId", {
    header: "Student ID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("name", {
    header: "Full Name",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "Date Of Birth",
    cell: TableCell,
    meta: {
      type: "date",
    },
  }),
  columnHelper.accessor("major", {
    header: "Major",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Communications", label: "Communications" },
        { value: "Business", label: "Business" },
        { value: "Psychology", label: "Psychology" },
      ],
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

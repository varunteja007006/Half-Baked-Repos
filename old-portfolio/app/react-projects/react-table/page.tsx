import React from "react";
import EditableTable from "./_components/EditableTable";
import { SortableDataTable } from "./_components/sortable-data-table";

export default function ReactTablePage() {
  return (
    <div className="space-y-5">
      <EditableTable />
      <SortableDataTable />
    </div>
  );
}

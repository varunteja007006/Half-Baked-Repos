import { DataTable } from "@/components/atom/data-table/data-table";

import { columns, payments } from "@/components/atom/data-table/sample/data";

export default function SampleTable() {
  return (
    <div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}

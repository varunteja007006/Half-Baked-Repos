"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import {
  DataSheetGrid,
  Column,
  checkboxColumn,
  textColumn,
  keyColumn,
} from "react-datasheet-grid";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";

// Define your row type anywhere
type Row = {
  active: boolean;
  firstName: string | null;
  lastName: string | null;
};

export default function ReactDataSheetGrid() {
  const { toast } = useToast();

  const [data, setData] = React.useState<Row[]>([
    { active: true, firstName: "Elon", lastName: "Musk" },
    { active: false, firstName: "Jeff", lastName: "Bezos" },
  ]);

  const [clickedData, setClickedData] = React.useState<Row | null>(null);

  const columns: Column<Row>[] = [
    {
      ...keyColumn<Row, "active">("active", checkboxColumn),
      title: "Active",
      maxWidth: 100,
    },
    {
      ...keyColumn<Row, "firstName">("firstName", textColumn),
      title: "First name",
      grow: 1,
    },
    {
      ...keyColumn<Row, "lastName">("lastName", textColumn),
      title: "Last name",
      grow: 1,
    },
    {
      title: "Actions",
      component: (props) => (
        <Button
          variant={"ghost"}
          type="button"
          className=""
          onClick={(e) => {
            e.stopPropagation();
            console.log("Props from the row: ", props);
            console.log("Button event: ", e);
            setClickedData(props.rowData);
            toast({
              title: "Edit",
              variant: "success",
              description: JSON.stringify(props.rowData),
            });
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  React.useEffect(() => console.log("On data change:\n", data), [data]);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">ReactDataSheetGrid</h1>
      <DataSheetGrid value={data} onChange={setData} columns={columns} />
      <div>
        <p className="text-lg font-semibold">
          Clicked Data: click on Edit button to see
        </p>
        <pre>{JSON.stringify(clickedData, null, 2)}</pre>
      </div>
    </div>
  );
}

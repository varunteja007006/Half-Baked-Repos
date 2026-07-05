import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReactTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>React Table</CardTitle>
        <CardDescription>This react table is for viewing data</CardDescription>
      </CardHeader>
      <CardContent>{/* table */}</CardContent>
    </Card>
  );
}

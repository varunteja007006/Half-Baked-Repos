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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function ExcelMockUp() {
  const [excelGrid, setExcelGrid] = React.useState<
    {
      value: string;
    }[][]
  >([
    [
      {
        value: "",
      },
    ],
  ]);

  const addRow = () => {
    setExcelGrid((prev) => {
      const len = prev.length && prev[0].length;
      const newRow = Array(len).fill({ value: "" });

      return [...prev, newRow];
    });
  };

  const addCol = () => {
    setExcelGrid(excelGrid.map((row) => [...row, { value: "" }]));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Form submitted",
      variant: "success",
      duration: 5000,
      description: JSON.stringify(excelGrid, null, 2),
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Excel Mockup</CardTitle>
          <CardDescription>
            In the excel mock up we have to add row and col buttons, ability to
            input the data in the cells.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={onSubmit} className="space-y-4">
            {excelGrid.map((row: any, rowIndex: number) => (
              <div key={rowIndex} className="flex flex-row gap-3">
                {row.map((cell: any, cellIndex: number) => (
                  <Input
                    key={cellIndex}
                    value={cell.value}
                    onChange={(e) =>
                      setExcelGrid((prev: any) => {
                        const newGrid = [...prev];
                        newGrid[rowIndex][cellIndex] = {
                          ...newGrid[rowIndex][cellIndex],
                          value: e.target.value,
                        };
                        return newGrid;
                      })
                    }
                  />
                ))}
              </div>
            ))}
            <Button type="submit" variant={"success"}>
              Save
            </Button>
          </form>
          <div className="flex flex-row gap-2">
            <Button variant="outline" onClick={addRow}>
              Add Row
            </Button>
            <Button variant="outline" onClick={addCol}>
              Add Column
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

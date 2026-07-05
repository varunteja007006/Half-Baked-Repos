"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "./types";

const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (newValue: string) => {
    setValue(newValue);
    tableMeta?.updateData(row.index, column.id, newValue);
  };

  return columnMeta?.type === "select" ? (
    <Select
      onValueChange={onSelectChange}
      value={initialValue}
      disabled={!tableMeta?.editedRows[row.id]}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {columnMeta?.options?.map((option: Option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <Input
      className="w-[180px]"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type={columnMeta?.type || "text"}
      disabled={!tableMeta?.editedRows[row.id]}
    />
  );
};

export default TableCell;

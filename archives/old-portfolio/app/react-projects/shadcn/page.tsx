"use client";
import React from "react";
import { SampleDatePicker } from "./_components/datepicker-form";
import { DateRangePicker } from "@/components/custom/date-range-picker";
import SimpleDataTable from "@/components/custom/simple-data-table";
import { columns, payments } from "./_components/sample-table-data";
import MultipleDialogs from "./_components/multiple-dialogs";
import ComboBoxForm from "./_components/combo-box-form";
import DateInputForm from "./_components/date-input";
import DebouncedInput from "@/components/custom/debounced-input";

export default function Page() {
  const [debouncedValue, setDebouncedValue] = React.useState("");
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Shadcn UI - React Hook Form</h1>
      <p>An examples of shadcn ui and react hook form integration.</p>

      <SampleDatePicker />

      <ComboBoxForm />

      <DateInputForm />

      <h1 className="text-2xl font-semibold">Shadcn UI Components</h1>
      <p>An examples of shadcn ui components.</p>
      <div className="space-y-3">
        <p>Debounced value: {debouncedValue}</p>
        <DebouncedInput
          value="hello"
          onChange={(value: string) => setDebouncedValue(value)}
          debounce={1200}
        />
      </div>

      <MultipleDialogs />

      <SimpleDataTable columns={columns} data={payments} />

      <DateRangePicker
        onUpdate={(values) => console.log(values)}
        initialDateFrom="2023-01-01"
        initialDateTo="2023-12-31"
        align="start"
        locale="en-GB"
        showCompare={false}
      />
    </div>
  );
}

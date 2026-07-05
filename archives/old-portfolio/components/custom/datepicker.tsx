"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const DatePicker = React.forwardRef<
  any,
  { className?: string; date?: Date; setDate?: any; btnProps?: any }
>(({ className, date, setDate, btnProps, ...props }, ref) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          {...props}
          {...btnProps}
          ref={ref}
        >
          <CalendarIcon className="mr-2 w-4 h-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-auto ">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={setDate}
          fromYear={1960}
          toYear={2030}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
});

DatePicker.displayName = "DatePicker";

export { DatePicker };

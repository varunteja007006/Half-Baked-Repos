"use client";

import * as React from "react";
import { format } from "date-fns";
import { MdOutlineCalendarToday } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

function DatePickerWithRange({
  className,
  date,
  setDate,
  enableRange = true,
  enableFooter = true,
  pagedNavigation = true,
}: Readonly<{
  className?: string;
  date: { from: Date | undefined; to: Date | undefined };
  setDate:
    | React.Dispatch<
        React.SetStateAction<{
          from: Date | undefined;
          to: Date | undefined;
        }>
      >
    | any;
  enableRange?: boolean;
  enableFooter?: boolean;
  pagedNavigation?: boolean;
}>) {
  const curDate = new Date();

  const handleDateChange = (name: string, value: Date | undefined) => {
    if (!value) {
      value = new Date();
    }
    setDate((oldState: { from: Date | undefined; to: Date | undefined }) => {
      const newState = {
        ...oldState,
        [name]: new Date(value),
      };
      return newState;
    });
  };

  return (
    <div className={cn("", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-fit min-w-60 max-w-64 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <MdOutlineCalendarToday className="mr-2 w-4 h-4" />
            {date?.from ? (
              date?.to ? (
                <>
                  {format(date?.from, "LLL dd, y")} -{" "}
                  {format(date?.to, "LLL dd, y")}
                </>
              ) : (
                format(date?.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" align="start">
          {enableRange && (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              pagedNavigation={pagedNavigation}
              captionLayout="dropdown-buttons"
              fromDate={new Date("1970-01-01")}
              toDate={curDate}
              className={"date-picker-dropdown"}
            />
          )}
          {enableFooter && (
            <div className="grid grid-cols-1 gap-2 m-2 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="fromDate">From Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date?.from && "text-muted-foreground"
                      )}
                    >
                      <MdOutlineCalendarToday className="mr-2 w-4 h-4" />
                      {date?.from ? (
                        format(date?.from, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 w-auto">
                    <Calendar
                      mode="single"
                      selected={date?.from}
                      onSelect={(newDate) => handleDateChange("from", newDate)}
                      captionLayout="dropdown-buttons"
                      fromDate={new Date("1970-01-01")}
                      toDate={date?.to || curDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="toDate">To Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date?.to && "text-muted-foreground"
                      )}
                    >
                      <MdOutlineCalendarToday className="mr-2 w-4 h-4" />
                      {date?.to ? (
                        format(date?.to, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 w-auto">
                    <Calendar
                      mode="single"
                      selected={date?.to}
                      onSelect={(newDate) => handleDateChange("to", newDate)}
                      captionLayout="dropdown-buttons"
                      fromDate={date?.from || new Date("1970-01-01")}
                      toDate={curDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default React.memo(DatePickerWithRange);

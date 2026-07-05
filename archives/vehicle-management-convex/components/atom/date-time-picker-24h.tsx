"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface DateTimePicker24hProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  onSelectionChange?: (date: Date | undefined) => void;
  className?: string;
}

export default function DateTimePicker24h<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder = "MM/DD/YYYY HH:mm",
  description,
  disabled = false,
  onSelectionChange,
  className,
}: Readonly<DateTimePicker24hProps<TFieldValues, TName>>) {
  const hours = Array.from({ length: 24 }, (_, i) => i).reverse();
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: Date | undefined = field.value as Date | undefined;

        const handleDateSelect = (selectedDate: Date | undefined) => {
          if (!selectedDate) return;
          // Preserve time from existing value if present
          const newDate = selected ? new Date(selected) : new Date(selectedDate);
          newDate.setFullYear(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
          );
          field.onChange(newDate);
          onSelectionChange?.(newDate);
        };

        const handleTimeChange = (type: "hour" | "minute", value: number) => {
          const base = selected ? new Date(selected) : new Date();
          if (type === "hour") base.setHours(value);
          else base.setMinutes(value);
          field.onChange(base);
          onSelectionChange?.(base);
        };

        return (
          <FormItem className={className}>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    disabled={disabled}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !selected && "text-muted-foreground",
                    )}
                  >
                    {selected ? format(selected, "MM/dd/yyyy HH:mm") : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="sm:flex">
                    <Calendar mode="single" selected={selected} onSelect={handleDateSelect} />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {hours.map((hour) => (
                            <Button
                              key={hour}
                              size="icon"
                              variant={
                                selected && selected.getHours() === hour ? "default" : "ghost"
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange("hour", hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {minutes.map((minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={
                                selected && selected.getMinutes() === minute ? "default" : "ghost"
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange("minute", minute)}
                            >
                              {minute.toString().padStart(2, "0")}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

// Dialog-based renderer: useful when the picker needs to appear inside a dialog
// that supports scrolling on mobile / small viewports. This is a controlled
// component (value/onChange) and intentionally independent from react-hook-form.
export function DateTimePickerDialog({
  value,
  onChange,
}: Readonly<{
  value?: Date;
  onChange: (value?: Date) => void;
}>) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const reversedHours = [...hours].reverse();
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const newDate = value ? new Date(value) : new Date(selectedDate);
    newDate.setFullYear(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    );
    onChange(newDate);
  };

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    const base = value ? new Date(value) : new Date();
    if (type === "hour") {
      // preserve AM/PM from the current base
      const hour = (parseInt(val) % 12) + (base.getHours() >= 12 ? 12 : 0);
      base.setHours(hour);
    } else if (type === "minute") {
      base.setMinutes(parseInt(val));
    } else if (type === "ampm") {
      const currentHours = base.getHours();
      if (val === "PM" && currentHours < 12) base.setHours(currentHours + 12);
      if (val === "AM" && currentHours >= 12) base.setHours(currentHours - 12);
    }
    onChange(base);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "MM/dd/yyyy hh:mm aa") : <span>MM/DD/YYYY hh:mm aa</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Choose a date and time</DialogTitle>
        </DialogHeader>
        <div className="sm:flex">
          <Calendar mode="single" selected={value} onSelect={handleDateSelect} />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {reversedHours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={value && value.getHours() % 12 === hour % 12 ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={value && value.getMinutes() === minute ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("minute", minute.toString())}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      value &&
                      ((ampm === "AM" && value.getHours() < 12) ||
                        (ampm === "PM" && value.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={() => setIsOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

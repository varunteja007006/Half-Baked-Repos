"use client";

import React, { useState } from "react";
import { Control, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * A reusable date picker component for forms using shadcn components.
 *
 * Features:
 * - Date selection with calendar popup
 * - TypeScript support with generic form field types
 * - Customizable labels, descriptions, and placeholders
 * - Optional selection change callback for side effects
 * - Proper form integration with react-hook-form
 * - Date formatting for display
 * - All react-day-picker props supported for maximum customization
 *
 * @example
 * ```tsx
 * <DatePicker
 *   control={form.control}
 *   name="purchaseDate"
 *   label="Purchase Date"
 *   description="Select the vehicle purchase date"
 *   placeholder="Select date"
 *   captionLayout="dropdown"
 *   fromYear={2000}
 *   toYear={2030}
 *   calendarDisabled={{ after: new Date() }}
 * />
 * ```
 */

interface DatePickerFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  // Form related props
  control: Control<TFieldValues>;
  name: TName;

  // Component props
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;

  // Callbacks
  onSelectionChange?: (date: Date | undefined) => void;

  // Styling
  className?: string;
}

// Combine form props with all Calendar component props
type DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = DatePickerFormProps<TFieldValues, TName> &
  Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect" | "disabled"> & {
    // Separate calendar disabled from button disabled
    disabled?: boolean; // For the button
    calendarDisabled?: React.ComponentProps<typeof Calendar>["disabled"]; // For the calendar
  };

export default function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder = "Select date...",
  description,
  required = false,
  disabled,
  calendarDisabled,
  captionLayout = "dropdown",
  onSelectionChange,
  className,
  ...calendarProps
}: Readonly<DatePickerProps<TFieldValues, TName>>) {
  const [open, setOpen] = useState(false);

  const handleDateSelect = (
    date: Date | undefined,
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => {
    if (date) {
      // Convert to ISO string for form storage
      field.onChange(format(date, "yyyy-MM-dd"));
      setOpen(false);
      onSelectionChange?.(date);
    }
  };

  const getDateFromValue = (value: string) => {
    if (!value) return undefined;
    try {
      return new Date(value);
    } catch {
      return undefined;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = getDateFromValue(field.value);

        return (
          <FormItem className={className}>
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => handleDateSelect(date, field)}
                  disabled={calendarDisabled}
                  captionLayout={captionLayout}
                  {...calendarProps}
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

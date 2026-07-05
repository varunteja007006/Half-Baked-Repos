"use client";

import React, { useState } from "react";
import { Control, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A reusable year picker component for forms.
 *
 * Features:
 * - Year-only selection with searchable dropdown
 * - Configurable year range (default: 1900 to current year + 2)
 * - TypeScript support with generic form field types
 * - Customizable labels, descriptions, and placeholders
 * - Optional selection change callback for side effects
 * - Consistent width and styling
 *
 * @example
 * ```tsx
 * <YearPicker
 *   control={form.control}
 *   name="year"
 *   label="Model Year"
 *   description="Select the year of manufacture"
 *   minYear={1990}
 *   maxYear={2030}
 * />
 * ```
 */

interface YearPickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  // Form related props
  control: Control<TFieldValues>;
  name: TName;

  // Component props
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  description?: string;
  required?: boolean;

  // Year range configuration
  minYear?: number;
  maxYear?: number;

  // Callbacks
  onSelectionChange?: (year: number | undefined) => void;

  // Styling
  className?: string;
  disabled?: boolean;
}

export default function YearPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder = "Select year...",
  searchPlaceholder = "Search year...",
  description,
  required = false,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 2,
  onSelectionChange,
  className,
  disabled = false,
}: Readonly<YearPickerProps<TFieldValues, TName>>) {
  const [open, setOpen] = useState(false);

  // Generate years array (newest to oldest)
  const years = React.useMemo(() => {
    return Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
  }, [minYear, maxYear]);

  const handleSelect = (year: number, field: ControllerRenderProps<TFieldValues, TName>) => {
    field.onChange(year);
    setOpen(false);
    onSelectionChange?.(year);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  disabled={disabled}
                  className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                >
                  {field.value ? field.value : placeholder}
                  <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-full p-0"
              align="start"
              style={{ width: "var(--radix-popover-trigger-width)" }}
            >
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {years.map((year) => (
                      <CommandItem
                        key={year}
                        value={year.toString()}
                        onSelect={() => handleSelect(year, field)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === year ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {year}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

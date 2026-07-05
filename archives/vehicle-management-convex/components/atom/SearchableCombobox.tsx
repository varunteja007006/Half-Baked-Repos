"use client";

import React from "react";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A reusable searchable combobox component for forms.
 *
 * Features:
 * - Full-text search functionality
 * - TypeScript support with generic form field types
 * - Customizable placeholder, description, and empty state
 * - Optional selection change callback for side effects
 * - Consistent width between trigger and dropdown
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: "1", label: "Option 1", searchValue: "option one" },
 *   { value: "2", label: "Option 2" },
 * ];
 *
 * <SearchableCombobox
 *   control={form.control}
 *   name="fieldName"
 *   label="Select Option"
 *   options={options}
 *   onSelectionChange={(value, option) => {
 *     console.log("Selected:", value, option);
 *   }}
 * />
 * ```
 */

export interface ComboboxOption {
  value: string;
  label: string;
  searchValue?: string; // Optional custom search value
}

interface SearchableComboboxProps<
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

  // Options
  options: ComboboxOption[];
  emptyMessage?: string;

  // Callbacks
  onSelectionChange?: (value: string, option: ComboboxOption | undefined) => void;

  // Styling
  className?: string;
  disabled?: boolean;
}

export default function SearchableCombobox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search options...",
  description,
  required = false,
  options = [],
  emptyMessage = "No option found.",
  onSelectionChange,
  className,
  disabled = false,
}: Readonly<SearchableComboboxProps<TFieldValues, TName>>) {
  const [open, setOpen] = React.useState(false);

  const getDisplayValue = (value: string): string => {
    if (!value) return placeholder;
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label || placeholder;
  };

  const handleSelect = (
    selectedValue: string,
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    field.onChange(selectedValue);
    setOpen(false);

    // Trigger callback if provided
    onSelectionChange?.(selectedValue, selectedOption);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                >
                  {getDisplayValue(field.value)}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              align="start"
              sideOffset={4}
              style={{ width: "var(--radix-popover-trigger-width)" }}
            >
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.searchValue || option.label}
                        onSelect={() => handleSelect(option.value, field)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            option.value === field.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {option.label}
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

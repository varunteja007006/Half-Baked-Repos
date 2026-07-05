"use client";

import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

/**
 * A simple color picker component using native HTML5 color input.
 * Alternative to the @uiw/react-color implementation for simpler use cases.
 */

interface SimpleColorPickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  required?: boolean;
  onSelectionChange?: (color: string | undefined) => void;
  className?: string;
  disabled?: boolean;
}

export default function SimpleColorPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required = false,
  onSelectionChange,
  className,
  disabled = false,
}: Readonly<SimpleColorPickerProps<TFieldValues, TName>>) {
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
          <FormControl>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={field.value || "#ffffff"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onSelectionChange?.(e.target.value);
                }}
                disabled={disabled}
                className={cn(
                  "h-10 w-16 rounded-md border border-input bg-background cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                )}
              />
              <span className="text-sm text-muted-foreground">
                {field.value || "No color selected"}
              </span>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

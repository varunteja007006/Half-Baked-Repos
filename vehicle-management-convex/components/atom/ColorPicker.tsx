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
import { PaletteIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Compact } from "@uiw/react-color";

// Define the color result interface for @uiw/react-color
interface ColorResult {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a?: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
    a?: number;
  };
}

/**
 * A reusable color picker component for forms using @uiw/react-color.
 *
 * Features:
 * - Professional color picker with swatches and custom input
 * - TypeScript support with generic form field types
 * - Customizable labels, descriptions, and placeholders
 * - Optional selection change callback for side effects
 * - Visual color preview in trigger button
 * - Common vehicle colors predefined
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   control={form.control}
 *   name="color"
 *   label="Vehicle Color"
 *   description="Select the vehicle color"
 *   placeholder="Choose a color"
 * />
 * ```
 */

interface ColorPickerProps<
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
  onSelectionChange?: (color: string | undefined) => void;

  // Styling
  className?: string;
  disabled?: boolean;
}

// Common vehicle colors for quick selection
const VEHICLE_COLORS = [
  "#FFFFFF", // White
  "#000000", // Black
  "#C0C0C0", // Silver
  "#808080", // Gray
  "#FF0000", // Red
  "#0000FF", // Blue
  "#008000", // Green
  "#FFFF00", // Yellow
  "#FFA500", // Orange
  "#A52A2A", // Brown
  "#800080", // Purple
  "#FFC0CB", // Pink
  "#FFD700", // Gold
  "#800000", // Maroon
  "#000080", // Navy
  "#F5F5DC", // Beige
  "#87CEEB", // Sky Blue
  "#32CD32", // Lime Green
  "#DC143C", // Crimson
  "#4B0082", // Indigo
];

export default function ColorPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder = "Select color...",
  description,
  required = false,
  onSelectionChange,
  className,
  disabled = false,
}: Readonly<ColorPickerProps<TFieldValues, TName>>) {
  const [open, setOpen] = useState(false);

  const handleColorChange = (
    color: ColorResult,
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => {
    const hexColor = color.hex;
    field.onChange(hexColor);
    onSelectionChange?.(hexColor);
  };

  const getColorName = (value: string) => {
    const colorNames: { [key: string]: string } = {
      "#ffffff": "White",
      "#000000": "Black",
      "#c0c0c0": "Silver",
      "#808080": "Gray",
      "#ff0000": "Red",
      "#0000ff": "Blue",
      "#008000": "Green",
      "#ffff00": "Yellow",
      "#ffa500": "Orange",
      "#a52a2a": "Brown",
      "#800080": "Purple",
      "#ffc0cb": "Pink",
      "#ffd700": "Gold",
      "#800000": "Maroon",
      "#000080": "Navy",
      "#f5f5dc": "Beige",
    };

    return colorNames[value?.toLowerCase()] || value;
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
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full justify-start gap-2",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <div
                    className="h-5 w-5 rounded border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: field.value || "#f3f4f6" }}
                  />
                  {field.value ? getColorName(field.value) : placeholder}
                  <PaletteIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
              <div className="space-y-3">
                <Compact
                  color={field.value || "#ffffff"}
                  colors={VEHICLE_COLORS}
                  onChange={(color) => handleColorChange(color, field)}
                  style={{
                    boxShadow: "none",
                    background: "transparent",
                  }}
                />

                {field.value && (
                  <div className="border-t pt-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        field.onChange("");
                        onSelectionChange?.("");
                        setOpen(false);
                      }}
                      className="w-full"
                    >
                      Clear Color
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

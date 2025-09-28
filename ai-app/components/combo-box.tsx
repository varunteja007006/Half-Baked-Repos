"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type OptionType = {
  value: string;
  label: string;
};

export function Combobox({
  options,
  onSelect,
}: Readonly<{
  onSelect: (value: string, item?: OptionType) => void;
  options: Array<OptionType>;
}>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          //   role="combobox"
          type="button"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((item) => item.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: "var(--radix-popover-trigger-width)" }}
        className="w-full p-0"
      >
        <Command>
          <CommandInput placeholder="Search options..." className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((items) => (
                <CommandItem
                  key={items.value}
                  value={items.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect?.(
                      currentValue === value ? "" : currentValue,
                      items
                    );
                  }}
                >
                  {items.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === items.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

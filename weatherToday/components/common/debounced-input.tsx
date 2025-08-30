"use client";

import React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useDebounceValue } from "usehooks-ts";

export default function DebouncedInput({
  setValue,
  options = [],
  loading = false,
}: Readonly<{
  setValue: (value: string) => void;
  options: any;
  loading: boolean;
}>) {
  const [debouncedValue, setInputValue] = useDebounceValue("", 1000);

  React.useEffect(() => {
    if (setValue) {
      setValue(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <Command>
      <CommandInput
        onValueChange={(value) => setInputValue(value)}
        placeholder="Search the location..."
      />
      <CommandList>
        {options && options.length !== 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        <CommandGroup>
          {loading && <CommandItem>Searching...</CommandItem>}
          {options.map((item: any) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={(currentValue) => {
                setInputValue(
                  currentValue === debouncedValue ? "" : currentValue
                );
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  debouncedValue === item.value ? "opacity-100" : "opacity-0"
                )}
              />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CommandList } from "cmdk";

type MultiSelectProps = React.ComponentPropsWithoutRef<"div"> & {
  options: string[];
  selected: string[];
  label: string;
  value: string;
  onChange: (selected: string[]) => void;
  className?: string;
  sizeOffset?: number;
  field: any;
};

const MultiSelect = React.forwardRef(function MultiSelect(
  {
    options,
    selected,
    label,
    value,
    onChange,
    className,
    sizeOffset,
    field,
    ...props
  }: MultiSelectProps,
  ref
) {
  const [open, setOpen] = React.useState(false);
  const [popoverContentDimensions, setPopoverContentDimensions] =
    React.useState<{ width: string }>({ width: "280px" });
  const popupRef = React.useRef<HTMLButtonElement>(null);

  //  To check the width of the button and set the popover content width accordingly
  React.useEffect(() => {
    const refValue = popupRef?.current;
    if (refValue) {
      const width = refValue?.offsetWidth || 280;
      setPopoverContentDimensions({
        width: `${width + (sizeOffset ?? 0)}px`,
      });
    }
  }, [popupRef?.current]);

  const handleUnselect = (item: any) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role=""
          aria-expanded={open}
          className={`w-full justify-between ${
            selected?.length > 1 ? "h-fit min-h-10 py-0.5" : "h-10"
          }`}
          onClick={() => setOpen(!open)}
          ref={popupRef}
          id={field.name}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => {
              const found: any = options?.find(
                (optionItem: any) => optionItem?.[value] === item
              );
              const name: any = found ? found?.[label] : "";
              return (
                <Badge
                  variant="outline"
                  key={item}
                  className="my-0.5"
                  onClick={() => handleUnselect(item)}
                >
                  {name}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="w-3 h-3 text-muted/[0.8] hover:text-muted" />
                  </button>
                </Badge>
              );
            })}
            {!selected && <span className="text-gray-600">Select</span>}
          </div>
          <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ ...popoverContentDimensions }}
        className="p-0 w-full"
      >
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="overflow-auto max-h-64">
              {options.map((option: any) => (
                <CommandItem
                  key={option?.[value]}
                  onSelect={() => {
                    onChange(
                      selected.includes(option?.[value])
                        ? selected.filter((item) => item !== option?.[value])
                        : [...selected, option?.[value]]
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option?.[value])
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option?.[label]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export { MultiSelect };

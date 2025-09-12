"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronDown } from "react-icons/hi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CommandList, CommandLoading } from "cmdk";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check, LoaderCircle, Square } from "lucide-react";

/**
 * Render a ComboBox component with a dropdown menu for selecting options.
 * @return {JSX.Element} The ComboBox component JSX.
 */

export type ComboBoxProps = {
  options: any[];
  form: any;
  field: any;
  value: string;
  label: string;
  defaultValue?: string | number;
  cbFunc?: any;
  required?: boolean;
  disabled?: boolean;
  sizeOffset?: number;
  loading?: boolean;
};

function ComboBox(props: Readonly<ComboBoxProps>) {
  const { field, form, value, label, options } = props;

  if (!field || !form) {
    throw new Error("Field and form are required");
  }

  const [open, setOpen] = React.useState(false);

  const [popoverContentDimensions, setPopoverContentDimensions] =
    React.useState<{ width: string }>({ width: "280px" });

  const popupRef = React.useRef<HTMLButtonElement>(null);

  //  To check the width of the button and set the popover content width accordingly
  React.useLayoutEffect(() => {
    const refValue = popupRef?.current;
    if (refValue) {
      const width = refValue?.offsetWidth || 280;
      setPopoverContentDimensions({
        width: `${width + (props?.sizeOffset ?? 0)}px`,
      });
    }
  }, [popupRef?.current]);

  const modifiedOptions = React.useMemo(
    () =>
      options?.map((item, index) => {
        return {
          ...item,
          value: item[value],
          label: item[label],
          index: index + 1,
        };
      }),
    [options, value, label]
  );

  // check if selectedValue is present or not and return true or false
  const checkSelectedValue = () => {
    if (!field.value) {
      return true;
    }
    return !modifiedOptions?.find((item) => item.value === field.value)?.label;
  };

  // get select value based on selectedValue & also reset the value of this dropdown
  // if selectedValue is not present
  const getSelectedValue = () => {
    if (!field.value) {
      return "Select";
    }
    const selectedLabel = modifiedOptions?.find(
      (item) => item.value === field.value
    )?.label;
    return selectedLabel || "Select";
  };

  const handleOnSelect = (item: any) => {
    if (props.required) {
      // if required is true then set the value and do not let user to un-select
      form?.setValue(field.name, item.value);
    } else {
      // if required is false then set the value and let user to un-select
      form?.getValues(field.name) === item.value
        ? form?.setValue(field.name, props?.defaultValue ?? "")
        : form?.setValue(field.name, item.value);
    }

    // if cbFunc is present then call it
    if (props.cbFunc && typeof props.cbFunc === "function") {
      props.cbFunc(item.value);
    }

    // clear the errors whenever the user selects an option
    form?.clearErrors(field.name);

    // close the popover
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="menu"
            className={cn(
              "w-full justify-between disabled:hover:bg-white/[0.7] !pointer-events-auto disabled:cursor-not-allowed",
              checkSelectedValue() && "text-muted-foreground"
            )}
            ref={popupRef}
            disabled={props?.disabled}
            id={field.name}
          >
            <span className="overflow-hidden text-ellipsis">
              {getSelectedValue()}
            </span>
            <HiOutlineChevronDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="overflow-auto p-0"
        style={{ ...popoverContentDimensions }}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <ScrollArea className="h-[200px]">
            <CommandList>
              <CommandEmpty>Not found</CommandEmpty>
              {props?.loading && (
                <CommandLoading>
                  <LoaderCircle className="w-6 h-6 animate-spin" />
                </CommandLoading>
              )}
              <CommandGroup>
                {modifiedOptions
                  ? modifiedOptions.map((item) => (
                      <CommandItem
                        className={cn(
                          `flex cursor-default items-center justify-start`,
                          form?.getValues(field.name) === item[value] &&
                            "bg-slate-200"
                        )}
                        value={`${item.label + item.value}`}
                        key={item.index}
                        onSelect={() => handleOnSelect(item)}
                      >
                        {item.value === form?.getValues(field.name) ? (
                          <Check className="mr-2 w-4 h-4" />
                        ) : (
                          <Square className="mr-2 w-4 h-4" />
                        )}{" "}
                        <span className="flex-1">{item.label}</span>
                      </CommandItem>
                    ))
                  : []}
              </CommandGroup>
            </CommandList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboBox;

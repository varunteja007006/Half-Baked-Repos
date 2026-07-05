import React from "react";

import { useDebounceCallback } from "usehooks-ts";
import { Input } from "../ui/input";

type DebouncedInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value"> & {
  onChange?: (value: string) => void;
  value?: string;
};

export default function DebouncedInput({ type, value, onChange, ...props }: DebouncedInputProps) {
  const [inputValue, setInputValue] = React.useState<string>(value ?? "");

  const debounced = useDebounceCallback((val: string) => {
    onChange?.(val);
  }, 700);

  return (
    <div>
      <Input
        type={type}
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const val = event.target.value;
          setInputValue(val);
          debounced(val);
        }}
        {...props}
      />
    </div>
  );
}

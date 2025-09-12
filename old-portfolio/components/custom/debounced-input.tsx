"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void; // renamed from onChange to onChange
  debounce?: number;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: Readonly<DebouncedInputProps>) {
  const [value, setValue] = useState(initialValue); // local value state to track input

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;

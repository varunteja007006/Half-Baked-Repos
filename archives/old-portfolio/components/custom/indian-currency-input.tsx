import { cn } from "@/lib/utils";
import React, { forwardRef, memo } from "react";
import { NumberFormatBase } from "react-number-format";

const CurrencyInputIndian = forwardRef(function CurrencyInputIndian(
  { maximumFractionDigits, ...props }: any,
  ref
) {
  const format = (numStr: string) => {
    if (numStr === "") return "";

    const intNum = Number(numStr);
    if (isNaN(intNum)) return numStr; // Handle invalid number strings

    const numToFormat = props.max && intNum > props.max ? intNum / 10 : intNum;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: maximumFractionDigits,
    }).format(numToFormat);
  };

  return (
    <NumberFormatBase
      {...props}
      format={format}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props?.className ?? ""
      )}
    />
  );
});

export default memo(CurrencyInputIndian);

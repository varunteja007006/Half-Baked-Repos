import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MyTooltip({
  children,
  text,
  providerProps = {},
  tooltipProps = {},
  tooltipContent = {},
}: Readonly<{
  children: React.ReactNode;
  text: string;
  providerProps?: any;
  tooltipProps?: any;
  tooltipContent?: any;
}>) {
  return (
    <TooltipProvider {...providerProps}>
      <Tooltip {...tooltipProps}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...tooltipContent}>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

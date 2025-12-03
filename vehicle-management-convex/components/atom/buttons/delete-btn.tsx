import React from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Trash2 } from "lucide-react";

export default function DeleteBtn({ deleteFunc }: Readonly<{ deleteFunc: () => Promise<void> }>) {
  const [pendingDelete, transition] = React.useTransition();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={pendingDelete}
          onClick={() => transition(async () => deleteFunc())}
          className="cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete</p>
      </TooltipContent>
    </Tooltip>
  );
}

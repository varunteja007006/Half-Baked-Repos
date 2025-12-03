import React from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Download } from "lucide-react";

export default function DownloadBtn({
  downloadFunc,
}: Readonly<{ downloadFunc: () => Promise<void> }>) {
  const [pendingDownload, transition] = React.useTransition();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          variant={"default"}
          disabled={pendingDownload}
          onClick={() => transition(async () => downloadFunc())}
          className="cursor-pointer"
        >
          <Download />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Download</p>
      </TooltipContent>
    </Tooltip>
  );
}

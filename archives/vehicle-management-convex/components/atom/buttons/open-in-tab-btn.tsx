import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ExternalLink } from "lucide-react";

export default function OpenInTabBtn({ fileUrl }: Readonly<{ fileUrl: string }>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={fileUrl} target="_blank" rel="noreferrer">
          <Button size={"icon"} className="cursor-pointer" variant={"default"}>
            <ExternalLink />
          </Button>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open in new tab</p>
      </TooltipContent>
    </Tooltip>
  );
}

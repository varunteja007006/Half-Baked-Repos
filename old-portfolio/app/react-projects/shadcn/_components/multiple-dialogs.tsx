import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreditCard, Keyboard, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MultipleDialogs() {
  const [state1, setState1] = React.useState(false);
  const [state2, setState2] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-start space-y-4">
      <div>{`Multiple Dialogs in a dropdown`}</div>
      <Dialog
        open={state1 || state2}
        onOpenChange={state1 ? setState1 : setState2}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>hello</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setState1(true)}
                className="bg-blue-100 border-[1px] border-blue-400 dark:text-black dark:hover:bg-blue-200"
              >
                Open Dialog One
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 w-4 h-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 w-4 h-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 w-4 h-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setState2(true)}
                className="bg-red-100 border-[1px] border-red-400 dark:text-black dark:hover:bg-red-200"
              >
                Open Dialog Two
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {state1 && `Dialog One?`}
              {state2 && `Dialog Two?`}
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

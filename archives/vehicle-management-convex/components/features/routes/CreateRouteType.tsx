"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RouteTypeForm from "./RouteTypeForm";

export function CreateRouteTypeDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Route Type</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Route Type</DialogTitle>
          <DialogDescription>Add a new route type to categorize your routes.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pl-4 py-2 pr-2">
          <RouteTypeForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
import RouteForm from "./RouteForm";

export function CreateRouteDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Route</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Route</DialogTitle>
          <DialogDescription>
            Add a new route with detailed location and pricing information.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pl-4 py-2 pr-2">
          <RouteForm onSuccess={() => setOpen(false)} onCancel={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

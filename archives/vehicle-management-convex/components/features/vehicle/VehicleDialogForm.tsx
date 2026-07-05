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
import VehicleForm from "./VehicleForm";

export function VehicleDialogForm() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Please fill out the form below to add a new vehicle to your fleet.
          </DialogDescription>
        </DialogHeader>
        <VehicleForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

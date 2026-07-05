"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ManufacturerForm, VehicleModelForm } from "@/components/features/vehicle";
import { FormContent, FormDialogContent } from "@/components/atom/FormDialog";

export function VehicleModelDialogForm() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Vehicle Model</Button>
      </DialogTrigger>
      <DialogContent className="w-full min-w-xl">
        <DialogHeader>
          <DialogTitle>Add Vehicle Model</DialogTitle>
          <DialogDescription>
            Please fill out the form below to add your vehicle model.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-4 py-2 pl-2">
          <VehicleModelForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VehicleManufacturerDialogForm() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Vehicle Manufacturer</Button>
      </DialogTrigger>
      <FormDialogContent>
        <DialogHeader>
          <DialogTitle>Add Vehicle Manufacturer</DialogTitle>
          <DialogDescription>
            Please fill out the form below to add your vehicle manufacturer.
          </DialogDescription>
        </DialogHeader>
        <FormContent>
          <ManufacturerForm onSuccess={() => setOpen(false)} />
        </FormContent>
      </FormDialogContent>
    </Dialog>
  );
}

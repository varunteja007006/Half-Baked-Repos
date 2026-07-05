"use client";

import React from "react";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FormContent, FormDialogContent } from "@/components/atom/FormDialog";
import TripTypeForm from "./TripTypeForm";

export function TripTypeDialogForm() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Trip Type</Button>
      </DialogTrigger>
      <FormDialogContent>
        <DialogHeader>
          <DialogTitle>Add Trip Type</DialogTitle>
          <DialogDescription>
            Please fill out the form below to add your trip type.
          </DialogDescription>
        </DialogHeader>
        <FormContent>
          <TripTypeForm onSuccess={() => setOpen(false)} />
        </FormContent>
      </FormDialogContent>
    </Dialog>
  );
}

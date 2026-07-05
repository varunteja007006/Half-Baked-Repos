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
import CompanyForm from "./CompanyForm";

export function AddCompanyDialogForm() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Company</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Company</DialogTitle>
          <DialogDescription>Add a new company to the system.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pl-4 py-2 pr-2">
          <CompanyForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

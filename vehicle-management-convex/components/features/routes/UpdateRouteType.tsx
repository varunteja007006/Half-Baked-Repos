"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";
import RouteTypeForm from "./RouteTypeForm";

export interface UpdateRouteTypeDialogProps {
  routeTypeId: Id<"route_types">;
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

export function UpdateRouteTypeDialog({
  routeTypeId,
  open,
  setOpen,
  children,
}: Readonly<UpdateRouteTypeDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Route Type</DialogTitle>
          <DialogDescription>Modify the route type details below.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pl-4 py-2 pr-2">
          <RouteTypeForm routeTypeId={routeTypeId} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

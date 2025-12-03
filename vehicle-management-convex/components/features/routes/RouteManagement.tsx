"use client";

import React from "react";

import { RouteTable } from "./route-table";
import { CreateRouteDialog } from "./CreateRoute";

export default function RouteManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Routes</h1>
          <p className="text-muted-foreground">
            Manage routes to define paths and associated details for your vehicles.
          </p>
        </div>
        <CreateRouteDialog />
      </div>

      <div className="border rounded-lg">
        <RouteTable />
      </div>
    </div>
  );
}

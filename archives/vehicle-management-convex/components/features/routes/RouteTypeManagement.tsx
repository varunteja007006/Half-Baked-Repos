"use client";

import React from "react";
import { RouteTypeTable, CreateRouteTypeDialog } from ".";

export default function RouteTypeManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Route Types</h1>
          <p className="text-muted-foreground">
            Manage route types to categorize your routes. Create global types or company-specific
            ones.
          </p>
        </div>
        <CreateRouteTypeDialog />
      </div>

      <div className="border rounded-lg">
        <RouteTypeTable />
      </div>
    </div>
  );
}

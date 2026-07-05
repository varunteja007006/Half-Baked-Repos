"use client";

import React from "react";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleDocumentUpload from "./VehicleDocumentUpload";

interface VehicleDetailsProps {
  vehicleId: Id<"vehicles">;
}

export const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicleId }) => {
  const vehicle = useQuery(api.vehicle.getVehicleById, { vehicleId });

  if (!vehicle) {
    return <div>Loading vehicle details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">License Plate</p>
              <p className="text-lg font-semibold">{vehicle.plate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={vehicle.active ? "default" : "secondary"}>
                {vehicle.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Year</p>
              <p>{vehicle.year || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Color</p>
              <p>{vehicle.color || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Interface */}
      <Tabs defaultValue="assignments" className="w-full">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Assignment history will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <VehicleDocumentUpload vehicleId={vehicleId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

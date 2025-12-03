"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./vehicle-instance-columns";

export interface VehicleInstanceTableRow {
  id: string;
  plate: string;
  modelName: string;
  manufacturerName: string;
  type: string;
  color: string | null;
  year: number | null;
  mileage: number | null;
  active: boolean;
  insuranceExpiry: number | null;
  nextServiceDue: number | null;
  createdAt: number;
}

export default function VehicleInstanceTable() {
  const vehiclesWithDetails = useQuery(api.vehicle.getVehiclesWithDetails);

  const data: VehicleInstanceTableRow[] = React.useMemo(() => {
    if (!vehiclesWithDetails) return [];

    return vehiclesWithDetails.map((vehicle) => ({
      id: vehicle._id,
      plate: vehicle.plate,
      modelName: vehicle.model?.name || "Unknown Model",
      manufacturerName: vehicle.manufacturer?.name || "Unknown Manufacturer",
      type: vehicle.model?.type || "Unknown",
      color: vehicle.color || null,
      year: vehicle.year || null,
      mileage: vehicle.mileage || null,
      active: vehicle.active,
      insuranceExpiry: vehicle.insuranceExpiryDate || null,
      nextServiceDue: vehicle.nextServiceDue || null,
      createdAt: vehicle._creationTime,
    }));
  }, [vehiclesWithDetails]);

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

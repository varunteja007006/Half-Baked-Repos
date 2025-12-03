"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";

export interface VehicleTableRow {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  fuelType: string;
  capacity: number | null;
  year: number | null;
  engineSize: string;
  createdAt: number | null;
}

export default function VehicleTable() {
  const models = useQuery(api.vehicle.getAllModelsWithManufacturer);

  const data: VehicleTableRow[] = React.useMemo(() => {
    if (!models) return [];

    return models.map((model) => ({
      id: model._id,
      name: model.name,
      manufacturer: model.manufacturer?.name || "Unknown",
      type: model.type,
      fuelType: model.fuelType || "—",
      capacity: model.capacity || null,
      year: model.year || null,
      engineSize: model.engineSize || "—",
      createdAt: model._creationTime,
    }));
  }, [models]);

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

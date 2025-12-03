"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";

export interface ManufacturerTableRow {
  id: string;
  name: string;
  country: string;
  website: string;
  modelsCount: number;
  createdAt: number | null;
}

export default function ManufacturerTable() {
  const manufacturers = useQuery(api.vehicle.getManufacturers);
  const models = useQuery(api.vehicle.getAllModelsWithManufacturer);

  const data: ManufacturerTableRow[] = React.useMemo(() => {
    if (!manufacturers) return [];

    // Count models per manufacturer
    const modelCounts = (models || []).reduce((acc, model) => {
      acc[model.manufacturerId] = (acc[model.manufacturerId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return manufacturers.map((manufacturer) => ({
      id: manufacturer._id,
      name: manufacturer.name,
      country: manufacturer.country || "—",
      website: manufacturer.website || "—",
      modelsCount: modelCounts[manufacturer._id] || 0,
      createdAt: manufacturer._creationTime,
    }));
  }, [manufacturers, models]);

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

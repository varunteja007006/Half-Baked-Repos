"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";

export default function TripTypeTable() {
  const tripTypes = useQuery(api.tripType.getTripTypes, { includeInactive: false });

  const data = React.useMemo(
    () =>
      tripTypes?.map((t) => ({
        id: t._id,
        code: t.code,
        name: t.name,
        description: t.description,
        sortBy: t.sortBy,
        createdAt: t.createdAt,
      })) ?? [],
    [tripTypes],
  );

  return <DataTable columns={columns} data={data} />;
}

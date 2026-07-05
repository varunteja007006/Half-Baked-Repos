"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";
import { Doc } from "@/convex/_generated/dataModel";

export interface RouteTypeTableRow {
  id: string;
  name: string;
  description: string;
  companyId: string | null;
  companyName: string;
  isDefault: boolean;
  createdAt: number | null;
}

export default function RouteTypeTable() {
  const routeTypes = useQuery(api.routeType.getRouteTypes, {
    includeInactive: false,
    includeDefaults: true,
  });

  // Get companies to map company names
  const companies = useQuery(api.company.getCompanies, {
    includeInactive: false,
  });

  const companiesMap = React.useMemo(() => {
    if (!companies) return new Map();
    return new Map(companies.map((company) => [company._id, company.name]));
  }, [companies]);

  const data: RouteTypeTableRow[] = (routeTypes || []).map((routeType: Doc<"route_types">) => ({
    id: routeType._id,
    name: routeType.name,
    description: routeType.description || "—",
    companyId: routeType.companyId || null,
    companyName: routeType.companyId
      ? companiesMap.get(routeType.companyId) || "Unknown Company"
      : "Global",
    isDefault: routeType.isDefault || false,
    createdAt: routeType.createdAt,
  }));

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";
import { Id } from "@/convex/_generated/dataModel";

export interface RouteTableRow {
  id: string;
  name: string;
  routeTypeName: string;
  startAddress: string;
  startLocation: string;
  endAddress: string;
  endLocation: string;
  distance: number | undefined;
  baseAmount: number | null | undefined;
  estimatedDuration: number | undefined;
  companyId: string | null | undefined;
  companyName: string;
  createdAt: number | null;
}

interface RouteTableProps {
  companyId?: Id<"companies">;
}

export default function RouteTable({ companyId }: Readonly<RouteTableProps>) {
  // Fetch routes data
  const routes = useQuery(api.route.getRoutes, {
    companyId: companyId,
    includeInactive: false,
  });

  // Get companies to map company names
  const companies = useQuery(api.company.getCompanies, {
    includeInactive: false,
  });

  // Get route types to map route type names
  const routeTypes = useQuery(api.routeType.getRouteTypes, {
    includeInactive: false,
    includeDefaults: true,
  });

  const companiesMap = React.useMemo(() => {
    if (!companies) return new Map();
    return new Map(companies.map((company) => [company._id, company.name]));
  }, [companies]);

  const routeTypesMap = React.useMemo(() => {
    if (!routeTypes) return new Map();
    return new Map(routeTypes.map((routeType) => [routeType._id, routeType.name]));
  }, [routeTypes]);

  const data: RouteTableRow[] = (routes || []).map((route) => ({
    id: route._id,
    name: route.name,
    routeTypeName: route.routeTypeId ? routeTypesMap.get(route.routeTypeId) || "—" : "—",
    startAddress: route.startAddress || "—",
    startLocation:
      route.startState && route.startPincode ? `${route.startState} - ${route.startPincode}` : "—",
    endAddress: route.endAddress || "—",
    endLocation:
      route.endState && route.endPincode ? `${route.endState} - ${route.endPincode}` : "—",
    distance: route.distance,
    baseAmount: route.baseAmount,
    estimatedDuration: route.estimatedDuration,
    companyId: route.companyId || null,
    companyName: route.companyId
      ? companiesMap.get(route.companyId) || "Unknown Company"
      : "Global",
    createdAt: route.createdAt,
  }));

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

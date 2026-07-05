"use client";

import React from "react";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SimpleSearchableCombobox } from "@/components/atom";
import { Id } from "@/convex/_generated/dataModel";

export default function Routes({
  value,
  multiSelect = false,
  onSelect,
  companyId,
}: Readonly<{
  value: string | undefined;
  multiSelect?: boolean;
  onSelect: (value: string) => void;
  companyId?: Id<"companies">;
}>) {
  const routes = useQuery(api.route.getRoutes, {
    includeInactive: false,
    ...(companyId && { companyId }),
  });

  const routeOptions = React.useMemo(() => {
    if (!routes) return [];
    return routes.map((r) => ({ value: r._id, label: r.name }));
  }, [routes]);

  if (multiSelect) {
    return null; // For now, only single select is needed
  }

  return (
    <SimpleSearchableCombobox
      value={value}
      options={routeOptions}
      placeholder="Select route"
      onSelect={onSelect}
    />
  );
}

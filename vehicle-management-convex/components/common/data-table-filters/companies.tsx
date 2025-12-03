"use client";

import React from "react";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SimpleSearchableCombobox } from "@/components/atom";

export default function Companies({
  value,
  multiSelect = false,
  onSelect,
}: Readonly<{
  value: string | undefined;
  multiSelect?: boolean;
  onSelect: (value: string) => void;
}>) {
  const companies = useQuery(api.company.getCompanies, { includeInactive: false });

  const companyOptions = React.useMemo(() => {
    if (!companies) return [];
    return companies.map((c) => ({ value: c._id, label: c.name }));
  }, [companies]);

  if (multiSelect) {
    return null; // For now, only single select is needed
  }

  return (
    <SimpleSearchableCombobox
      value={value}
      options={companyOptions}
      placeholder="Select company"
      onSelect={onSelect}
    />
  );
}

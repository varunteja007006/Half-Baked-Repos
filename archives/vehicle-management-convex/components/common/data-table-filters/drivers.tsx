"use client";

import React from "react";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SimpleSearchableCombobox } from "@/components/atom";

export default function Drivers({
  value,
  multiSelect = false,
  onSelect,
}: Readonly<{
  value: string | undefined;
  multiSelect?: boolean;
  onSelect: (value: string) => void;
}>) {
  const users = useQuery(api.appUser.adminListUsers, { onlyActive: false });

  const driverOptions = React.useMemo(() => {
    if (!users) return [];
    return users
      .filter((u) => u.roles.some((r) => r.role === "driver"))
      .map((u) => ({ value: u.appUser._id, label: u.appUser.name || u.user?.name || "" }));
  }, [users]);

  if (multiSelect) {
    return null; // For now, only single select is needed
  }

  return (
    <SimpleSearchableCombobox
      value={value}
      options={driverOptions}
      placeholder="Select driver"
      onSelect={onSelect}
    />
  );
}

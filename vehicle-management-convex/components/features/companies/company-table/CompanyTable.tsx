"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";

export interface CompanyTableRow {
  id: string;
  name: string;
  companyType: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  city: string;
  state: string;
  gstNumber: string;
  createdAt: number | null;
  isActive: boolean;
}

export default function CompanyTable() {
  const companies = useQuery(api.company.getCompanies, { includeInactive: false });

  const data: CompanyTableRow[] = (companies || []).map((company) => ({
    id: company._id,
    name: company.name,
    companyType: company.companyType || "—",
    contactPersonName: company.contactPersonName || "—",
    contactPersonEmail: company.contactPersonEmail || "—",
    contactPersonPhone: company.contactPersonPhone || "—",
    city: company.city || "—",
    state: company.state || "—",
    gstNumber: company.gstNumber || "—",
    createdAt: company.createdAt || null,
    isActive: company.isActive !== false,
  }));

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

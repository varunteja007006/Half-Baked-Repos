"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns } from "./columns";
import { UserRole, AdminListUsersResult } from "@/lib/types/user";

export default function UserTable() {
  const users = useQuery(api.appUser.adminListUsers, { onlyActive: false });

  const data = (users || []).map((item: AdminListUsersResult) => {
    const au = item.appUser;
    const user = item.user;
    return {
      id: au?._id ?? user?._id ?? "",
      name: au?.name ?? user?.name ?? "—",
      email: au?.email ?? user?.email ?? "—",
      roles: (item.roles || []).map((r: UserRole) => r.role).join(", ") || "—",
      createdAt: au?.createdAt ?? null,
      isActive: au?.isActive ?? true,
    };
  });

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

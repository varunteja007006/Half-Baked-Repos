"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns, UserDocumentRow } from "./columns";

export default function UserDocumentsTable() {
  const docs = useQuery(api.documentApproval.getAllUserDocumentsWithApprovalStatus, {
    limit: 200,
  });

  const data: UserDocumentRow[] = (docs || []).map((doc) => ({
    id: doc._id,
    kind: doc.kind || "\u2014",
    userName: doc.user?.name || "\u2014",
    userEmail: doc.user?.email || "\u2014",
    approvalStatus: doc.approvalStatus || "pending",
    createdAt: doc.createdAt || null,
    downloadUrl: doc.downloadUrl || null,
  }));

  return (
    <div className="w-full overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

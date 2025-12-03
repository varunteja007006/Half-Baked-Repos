import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { fileLocalDownload } from "@/lib/utils";

export interface UserDocumentRow {
  id: string;
  kind: string;
  userName: string;
  userEmail: string;
  approvalStatus: string;
  createdAt: number | null;
  downloadUrl?: string | null;
}

function DownloadWithAudit({
  documentId,
  docKind,
  documentUrl,
}: Readonly<{ documentId: string; docKind?: string; documentUrl: string }>) {
  const onDownload = async () => {
    await fileLocalDownload(documentUrl, `${docKind} - ${documentId}`, docKind);
  };

  return (
    <Button size="sm" variant="outline" onClick={onDownload}>
      <Download className="h-4 w-4 mr-2" />
      Download
    </Button>
  );
}

export const columns: ColumnDef<UserDocumentRow>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kind",
    header: "Document",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue("kind")}</span>
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("userName")}</span>
        <span className="text-sm text-muted-foreground">{row.original.userEmail}</span>
      </div>
    ),
  },
  {
    accessorKey: "approvalStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = String(row.getValue("approvalStatus"));
      let color = "text-muted-foreground";
      if (status === "approved") color = "text-green-700";
      else if (status === "rejected") color = "text-red-700";

      return <span className={`font-medium ${color}`}>{status}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded",
    cell: ({ getValue }) => {
      const value = getValue() as number | null;
      return value ? new Date(value).toLocaleString() : "\u2014";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doc = row.original;

      return (
        <div className="flex items-center gap-2">
          {doc.downloadUrl ? (
            <DownloadWithAudit
              documentId={doc.id}
              documentUrl={doc.downloadUrl}
              docKind={doc.kind}
            />
          ) : (
            <Button size="sm" variant="ghost" disabled>
              <Download className="h-4 w-4 mr-2" />
              No file
            </Button>
          )}
        </div>
      );
    },
  },
];

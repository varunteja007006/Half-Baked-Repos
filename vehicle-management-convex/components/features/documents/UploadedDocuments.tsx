"use client";

import * as React from "react";
import { Eye, Download, Trash2, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { withErrorHandling } from "@/lib/error-handler";

interface UploadedDocumentsProps {
  /** Array of document kinds to display */
  documentKinds: readonly string[];
  /** Optional appUserId to fetch documents for (defaults to current user) */
  appUserId?: Id<"app_users">;
  /** Custom title for the section */
  title?: string;
  /** Custom className for styling */
  className?: string;
  /** Show delete buttons (default: true) */
  showDeleteButton?: boolean;
  /** Show download buttons (default: true) */
  showDownloadButton?: boolean;
  /** Show view buttons (default: true) */
  showViewButton?: boolean;
  /** Show empty state cards for missing documents (default: true) */
  showEmptyStates?: boolean;
  /** Grid layout configuration */
  gridCols?: "1" | "2" | "3" | "4";
  /** Callback when a document is deleted */
  onDocumentDeleted?: (documentId: Id<"user_docs">, documentKind: string) => void;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Custom empty state component */
  emptyStateComponent?: React.ReactNode;
}

interface DocumentData {
  _id: Id<"user_docs">;
  kind: string;
  fileId: Id<"_storage">;
  fileUrl: string | null;
  fileName: string | null;
  contentType: string | null;
  approvalStatus?: "pending" | "approved" | "rejected";
  createdAt: number;
  expiry?: number;
  isActive?: boolean;
}

export function UploadedDocuments({
  documentKinds,
  appUserId,
  title = "Your Uploaded Documents",
  className = "",
  showDeleteButton = true,
  showDownloadButton = true,
  showViewButton = true,
  showEmptyStates = true,
  gridCols = "3",
  onDocumentDeleted,
  loadingComponent,
  emptyStateComponent,
}: Readonly<UploadedDocumentsProps>) {
  const deleteUserDocuments = useMutation(api.documentUpload.deleteUserDocuments);

  // Query to get existing documents
  const existingDocuments = useQuery(
    api.documentList.listUserDocuments,
    appUserId ? { appUserId } : {},
  );

  // Group documents by kind for easier access
  const documentsByKind = React.useMemo(() => {
    if (!existingDocuments) return {};

    return existingDocuments
      .filter((doc: DocumentData) => doc.isActive !== false) // Only show active documents
      .reduce((acc, doc) => {
        acc[doc.kind] = doc;
        return acc;
      }, {} as Record<string, DocumentData>);
  }, [existingDocuments]);

  const handleDeleteDocument = async (documentId: Id<"user_docs">, documentKind: string) => {
    const result = await withErrorHandling(
      () => deleteUserDocuments({ documentIds: [documentId] }),
      {
        loadingMessage: `Deleting ${documentKind} document...`,
        successMessage: `${documentKind} document deleted successfully!`,
        loadingToastId: `delete-${documentId}`,
      },
    );

    if (result && onDocumentDeleted) {
      onDocumentDeleted(documentId, documentKind);
    }
  };

  const handleViewDocument = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  const handleDownloadDocument = (fileUrl: string, fileName: string, documentKind: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName || `${documentKind}-document`;
    link.click();
  };

  const getApprovalBadgeVariant = (status?: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getGridColsClass = () => {
    switch (gridCols) {
      case "1":
        return "grid-cols-1";
      case "2":
        return "md:grid-cols-2";
      case "3":
        return "md:grid-cols-2 lg:grid-cols-3";
      case "4":
        return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "md:grid-cols-2 lg:grid-cols-3";
    }
  };

  // Loading state
  if (existingDocuments === undefined) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        {loadingComponent || <p className="text-sm text-muted-foreground">Loading documents...</p>}
      </div>
    );
  }

  // Empty state
  if (existingDocuments.length === 0 && !showEmptyStates) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        {emptyStateComponent || (
          <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className={`grid gap-4 ${getGridColsClass()}`}>
        {documentKinds.map((kind) => {
          const doc = documentsByKind[kind];

          // Empty state card
          if (!doc && showEmptyStates) {
            return (
              <Card key={kind} className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <CloudUpload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">{kind}</p>
                  <p className="text-xs text-muted-foreground">Not uploaded</p>
                </CardContent>
              </Card>
            );
          }

          // Skip if no document and empty states are disabled
          if (!doc && !showEmptyStates) {
            return null;
          }

          return (
            <Card key={kind} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{kind}</CardTitle>
                  <Badge variant={getApprovalBadgeVariant(doc!.approvalStatus)} className="text-xs">
                    {doc!.approvalStatus || "pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    <p>Uploaded: {new Date(doc!.createdAt).toLocaleDateString()}</p>
                    {doc!.expiry && <p>Expires: {new Date(doc!.expiry).toLocaleDateString()}</p>}
                  </div>

                  <div className="flex gap-2">
                    {doc!.fileUrl && showViewButton && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewDocument(doc!.fileUrl!)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                    {doc!.fileUrl && showDownloadButton && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleDownloadDocument(
                            doc!.fileUrl!,
                            doc!.fileName || `${kind}-document`,
                            kind,
                          )
                        }
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                    {showDeleteButton && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteDocument(doc!._id, kind)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default UploadedDocuments;

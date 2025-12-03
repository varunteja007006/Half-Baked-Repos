import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { DeleteBtn, DownloadBtn, OpenInTabBtn } from "@/components/atom/buttons";

import Image from "next/image";
import { ListUserDocuments } from "@/lib/types/types";
import { fileLocalDownload } from "@/lib/utils";
import { withErrorHandling } from "@/lib/error-handler";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function KycDocuments({
  uploadedDocs,
  canView = true,
  canDownload = true,
  canDelete = true,
  localDownload = true,
}: Readonly<{
  uploadedDocs: ListUserDocuments;
  canView?: boolean;
  canDownload?: boolean;
  canDelete?: boolean;
  localDownload?: boolean;
}>) {
  const handleDownload = async (fileUrl: string | null, fileName: string, docKind: string) => {
    if (localDownload && fileUrl) {
      fileLocalDownload(fileUrl, fileName, docKind);
    }
  };

  const deleteUserDocuments = useMutation(api.documentUpload.deleteUserDocuments);

  const handleDeleteDocument = async (documentId: Id<"user_docs">, documentKind: string) => {
    await withErrorHandling(() => deleteUserDocuments({ documentIds: [documentId] }), {
      loadingMessage: `Deleting ${documentKind} document...`,
      successMessage: `${documentKind} document deleted successfully!`,
      loadingToastId: `delete-${documentId}`,
    });
  };

  return (
    <>
      {uploadedDocs && uploadedDocs.length > 0 ? (
        uploadedDocs.map((doc) => (
          <Card key={doc._id} className="flex items-stretch gap-3 w-full">
            <CardContent className="flex-1">
              <div className="flex items-center justify-between gap-5">
                <div className="text-sm font-medium">{doc.kind || "Document"}</div>
                <div className="flex gap-2 shrink-0">
                  {doc.fileUrl && canView && <OpenInTabBtn fileUrl={doc.fileUrl} />}

                  {doc.fileUrl && canDownload && (
                    <DownloadBtn
                      downloadFunc={async () =>
                        handleDownload(doc.fileUrl, doc.fileName ?? "", doc.kind ?? "")
                      }
                    />
                  )}

                  {doc._id && canDelete && (
                    <DeleteBtn
                      deleteFunc={() => handleDeleteDocument(doc._id, doc.kind || "document")}
                    />
                  )}
                </div>
              </div>

              {doc.fileUrl ? (
                <div className="mt-2">
                  <Image
                    src={doc.fileUrl}
                    alt={doc.kind}
                    className="w-full max-w-[400px] h-auto max-h-[200px] object-contain rounded bg-gray-50 dark:bg-gray-800"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    width={400}
                    height={200}
                  />
                </div>
              ) : (
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  Stored as file id: {doc.fileId}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-sm text-gray-400 dark:text-gray-500">No documents uploaded yet.</div>
      )}
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { USER_DOC_KINDS, UserDocKind } from "@/lib/userDocKinds";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { withErrorHandling } from "@/lib/error-handler";
import UploadedDocuments from "@/components/features/documents/UploadedDocuments";

const fileSchema = z
  .custom<File>()
  .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB");

const formSchema = z.object(
  Object.fromEntries(
    USER_DOC_KINDS.map((kind) => [
      kind,
      z.array(fileSchema).max(1).optional(), // Make each document optional and max 1
    ]),
  ),
);
type FormValues = z.infer<typeof formSchema>;

export default function UserFileUpload({ className }: Readonly<{ className?: string }>) {
  const [uploadingDocuments, setUploadingDocuments] = React.useState<Set<string>>(new Set());

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(USER_DOC_KINDS.map((k) => [k, []])),
  });

  const submitUserDocuments = useMutation(api.documentUpload.submitUserDocuments);
  const generateUploadUrl = useMutation(api.documentUpload.generateUploadUrl);

  // Query to get existing documents for badge display
  const existingDocuments = useQuery(api.documentList.listUserDocuments, {});

  // Group documents by kind for easier access
  const documentsByKind = React.useMemo(() => {
    if (!existingDocuments) return {};

    return existingDocuments
      .filter((doc) => doc.isActive) // Only show active documents
      .reduce((acc, doc) => {
        acc[doc.kind] = doc;
        return acc;
      }, {} as Record<string, (typeof existingDocuments)[0]>);
  }, [existingDocuments]);

  // Upload individual document
  const uploadSingleDocument = async (kind: UserDocKind, file: File) => {
    setUploadingDocuments((prev) => new Set(prev).add(kind));

    try {
      const result = await withErrorHandling(
        async () => {
          // Generate upload URL
          const postUrl = await generateUploadUrl();
          const uploadResult = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!uploadResult.ok) {
            throw new Error(`Failed to upload ${kind} document to storage`);
          }

          const {
            storageId,
          }: {
            storageId: Id<"_storage">;
          } = await uploadResult.json();

          // Submit the document
          await submitUserDocuments({ docs: [{ kind, fileId: storageId }] });

          // Clear the form field for this document type
          form.setValue(kind, []);

          return storageId;
        },
        {
          loadingMessage: `Uploading ${kind} document...`,
          successMessage: `${kind} document uploaded successfully!`,
          loadingToastId: `upload-${kind}`,
        },
      );

      return result;
    } finally {
      setUploadingDocuments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(kind);
        return newSet;
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Upload files to storage and collect fileIds - only upload files that exist
    const result = await withErrorHandling(
      async () => {
        const uploadResults = await Promise.allSettled(
          USER_DOC_KINDS.map(async (kind) => {
            const files = data[kind];
            const file = files?.[0];
            if (!file) return null; // Skip if no file for this kind

            try {
              // First generate upload URL
              const postUrl = await generateUploadUrl();
              const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
              });

              if (!result.ok) {
                throw new Error(`Failed to upload ${kind} document to storage`);
              }

              const {
                storageId,
              }: {
                storageId: Id<"_storage">;
              } = await result.json();

              return { kind, fileId: storageId };
            } catch (uploadError) {
              console.error(`Error uploading ${kind}:`, uploadError);
              throw new Error(`Failed to upload ${kind} document`);
            }
          }),
        );

        // Filter out null results and check for upload failures
        const docs = uploadResults
          .filter(
            (
              r,
            ): r is PromiseFulfilledResult<{
              kind: UserDocKind;
              fileId: Id<"_storage">;
            }> => r.status === "fulfilled" && r.value !== null,
          )
          .map((r) => r.value);

        // Check if any uploads failed
        const failedUploads = uploadResults.filter((r) => r.status === "rejected");
        if (failedUploads.length > 0) {
          const failedReasons = failedUploads
            .map((f) => f.reason?.message || "Unknown error")
            .join(", ");
          throw new Error(`Some files failed to upload: ${failedReasons}`);
        }

        // Only proceed if we have documents to submit
        if (docs.length === 0) {
          throw new Error("No documents to upload");
        }

        await submitUserDocuments({ docs });
        return docs;
      },
      {
        loadingMessage: "Uploading documents...",
        successMessage: "Documents uploaded successfully!",
        loadingToastId: "document-upload",
      },
    );

    // Reset form on successful upload
    if (result) {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload New Documents Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload New Documents</h3>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className={cn("space-y-6", className)}>
              {USER_DOC_KINDS.map((kind) => {
                const hasExistingDoc = documentsByKind[kind];

                return (
                  <FormField
                    key={kind}
                    control={form.control}
                    name={kind}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          {kind} Document
                          {hasExistingDoc && (
                            <Badge variant="secondary" className="text-xs">
                              Already uploaded
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value || []}
                            onValueChange={field.onChange}
                            accept="image/*"
                            maxFiles={1}
                            maxSize={5 * 1024 * 1024}
                            onFileReject={(_, message) => {
                              form.setError(kind, { message });
                            }}
                          >
                            <FileUploadDropzone className="flex-row border-dotted">
                              <CloudUpload className="size-4" />
                              Drag and drop or
                              <FileUploadTrigger asChild>
                                <Button variant="link" size="sm" className="p-0">
                                  choose file
                                </Button>
                              </FileUploadTrigger>
                              to upload
                            </FileUploadDropzone>
                            <FileUploadList>
                              {(field.value || []).map((file) => (
                                <FileUploadItem
                                  key={`${kind}-${file.name}-${file.size}`}
                                  value={file}
                                >
                                  <FileUploadItemPreview />
                                  <FileUploadItemMetadata />
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() => uploadSingleDocument(kind, file)}
                                      disabled={uploadingDocuments.has(kind)}
                                      className="text-xs"
                                    >
                                      {uploadingDocuments.has(kind)
                                        ? "Uploading..."
                                        : `Upload ${kind}`}
                                    </Button>
                                    <FileUploadItemDelete asChild>
                                      <Button variant="ghost" size="icon" className="size-7">
                                        <X />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </FileUploadItemDelete>
                                  </div>
                                </FileUploadItem>
                              ))}
                            </FileUploadList>
                          </FileUpload>
                        </FormControl>
                        <FormDescription>
                          Upload your {kind} document (max 5MB). You can upload individually or all
                          at once.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                You can upload documents individually using the &ldquo;Upload&rdquo; button next to
                each file,
                <br />
                or upload all selected documents at once using the button below.
              </p>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={
                  !Object.values(form.getValues()).some((files) => files && files.length > 0)
                }
              >
                Upload All Selected Documents
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Existing Documents Section - Using Reusable Component */}
      <UploadedDocuments
        documentKinds={USER_DOC_KINDS}
        title="Your Uploaded Documents"
        gridCols="3"
        showEmptyStates={true}
        onDocumentDeleted={() => {
          // Documents will be automatically refreshed due to Convex reactivity
        }}
      />
    </div>
  );
}

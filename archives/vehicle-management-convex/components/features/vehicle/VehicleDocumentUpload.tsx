"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, FileText, Calendar, Download, Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchableCombobox } from "@/components/atom";
import {
  VEHICLE_DOC_KINDS,
  VehicleDocKind,
  VEHICLE_DOC_DISPLAY_NAMES,
  VEHICLE_DOC_DESCRIPTIONS,
} from "@/lib/vehicleDocKinds";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { withErrorHandling } from "@/lib/error-handler";
import { useErrorHandledOperation } from "@/hooks";

const fileSchema = z
  .custom<File>()
  .refine((file) => file.size <= 10 * 1024 * 1024, "File size must be less than 10MB")
  .refine((file) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    return allowedTypes.includes(file.type);
  }, "Only PDF, JPEG, PNG files are allowed");

// Simplified form schema for single document upload
const formSchema = z.object({
  docType: z.string().min(1, "Please select a document type"),
  file: z.array(fileSchema).min(1, "Please select a file").max(1, "Only one file allowed"),
  expiry: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface VehicleDocumentUploadProps {
  readonly vehicleId: Id<"vehicles">;
  readonly className?: string;
}

export default function VehicleDocumentUpload({
  vehicleId,
  className,
}: VehicleDocumentUploadProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docType: "",
      file: [],
      expiry: "",
    },
  });

  const submitVehicleDocuments = useMutation(api.vehicleDocuments.submitVehicleDocuments);
  const generateUploadUrl = useMutation(api.vehicleDocuments.generateUploadUrl);
  const deleteVehicleDocument = useMutation(api.vehicleDocuments.deleteVehicleDocument);
  const existingDocuments = useQuery(api.vehicleDocuments.getVehicleDocuments, { vehicleId });
  const executeWithErrorHandling = useErrorHandledOperation();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const result = await executeWithErrorHandling(
      async () => {
        if (!data.file || data.file.length === 0) {
          throw new Error("Please select a file to upload");
        }

        const file = data.file[0];
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) {
          throw new Error("Failed to upload file");
        }

        const { storageId }: { storageId: Id<"_storage"> } = await result.json();

        // Parse expiry date if provided
        let expiry: number | undefined;
        if (data.expiry) {
          expiry = new Date(data.expiry).getTime();
        }

        const docs = [
          {
            kind: data.docType as VehicleDocKind,
            fileId: storageId,
            expiry,
          },
        ];

        await submitVehicleDocuments({ vehicleId, docs });
        return true;
      },
      {
        loadingMessage: "Uploading document...",
        successMessage: "Document uploaded successfully",
        errorMessage: "Failed to upload document",
        successDismissible: true,
        successDuration: 3000,
        errorDismissible: true,
        errorDuration: 6000, // Longer duration for errors so users can read them
      },
    );

    if (result) {
      form.reset();
    }
    setIsSubmitting(false);
  };

  const handleDeleteDocument = async (documentId: Id<"vehicle_docs">) => {
    await withErrorHandling(() => deleteVehicleDocument({ documentId }), {
      loadingMessage: "Deleting document...",
      successMessage: "Document deleted successfully",
      errorMessage: "Failed to delete document",
      successDismissible: true,
      successDuration: 2500,
      errorDismissible: true,
      errorDuration: 5000,
    });
  };

  const formatExpiryDate = (expiry?: number) => {
    if (!expiry)
      return {
        formatted: "No expiry",
        isExpired: false,
        daysUntilExpiry: 0,
        isExpiringSoon: false,
      };

    const date = new Date(expiry);
    const now = new Date();
    const isExpired = date < now;
    const daysUntilExpiry = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      formatted: date.toLocaleDateString(),
      isExpired,
      daysUntilExpiry,
      isExpiringSoon: daysUntilExpiry <= 30 && daysUntilExpiry > 0,
    };
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Existing Documents */}
      {existingDocuments && existingDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Uploaded Documents
            </CardTitle>
            <CardDescription>Currently uploaded vehicle documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {existingDocuments.map((doc) => {
                const expiryInfo = formatExpiryDate(doc.expiry);
                const getApprovalStatusBadge = (status?: string) => {
                  switch (status) {
                    case "approved":
                      return (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Approved
                        </Badge>
                      );
                    case "rejected":
                      return <Badge variant="destructive">Rejected</Badge>;
                    case "pending":
                    default:
                      return <Badge variant="secondary">Pending Approval</Badge>;
                  }
                };

                return (
                  <div key={doc._id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">
                          {VEHICLE_DOC_DISPLAY_NAMES[doc.kind as VehicleDocKind]}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDocument(doc._id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getApprovalStatusBadge(doc.approvalStatus)}
                        {doc.approvalStatus === "rejected" && doc.approvalNotes && (
                          <span className="text-xs text-red-600">({doc.approvalNotes})</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Expiry:{" "}
                          {typeof expiryInfo === "string" ? expiryInfo : expiryInfo.formatted}
                        </span>
                        {typeof expiryInfo !== "string" && expiryInfo.isExpired && (
                          <Badge variant="destructive" className="text-xs">
                            Expired
                          </Badge>
                        )}
                        {typeof expiryInfo !== "string" && expiryInfo.isExpiringSoon && (
                          <Badge variant="secondary" className="text-xs">
                            Expires in {expiryInfo.daysUntilExpiry} days
                          </Badge>
                        )}
                      </div>

                      {doc.downloadUrl && (
                        <Button variant="outline" size="sm" asChild className="w-full">
                          <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudUpload className="h-5 w-5" />
            Upload Vehicle Document
          </CardTitle>
          <CardDescription>
            Upload a vehicle document. Supported formats: PDF, JPEG, PNG (max 10MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="docType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <SearchableCombobox
                      control={form.control}
                      name="docType"
                      label=""
                      options={VEHICLE_DOC_KINDS.map((kind) => ({
                        value: kind,
                        label: VEHICLE_DOC_DISPLAY_NAMES[kind],
                      }))}
                      placeholder="Select document type"
                      emptyMessage="No document type found"
                      searchPlaceholder="Search document types..."
                      description={
                        field.value && VEHICLE_DOC_DESCRIPTIONS[field.value as VehicleDocKind]
                      }
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document File</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value || []}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        accept="application/pdf,image/jpeg,image/png,image/jpg"
                      >
                        <FileUploadDropzone>
                          <div className="flex flex-col items-center gap-2 text-center">
                            <CloudUpload className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">
                                Drop files here or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, JPEG, PNG (max 10MB)
                              </p>
                            </div>
                          </div>
                        </FileUploadDropzone>
                        <FileUploadList>
                          {(field.value || []).map((file: File) => (
                            <FileUploadItem key={file.name + file.size} value={file}>
                              <FileUploadItemPreview />
                              <FileUploadItemMetadata />
                              <FileUploadItemDelete />
                            </FileUploadItem>
                          ))}
                        </FileUploadList>
                      </FileUpload>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value || ""}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the expiry date to receive renewal reminders
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CloudUpload className="h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileText,
  User,
  Car,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { VEHICLE_DOC_DISPLAY_NAMES } from "@/lib/vehicleDocKinds";
import { withErrorHandling } from "@/lib/error-handler";

interface DocumentApprovalManagerProps {
  readonly className?: string;
}

export default function DocumentApprovalManager({ className }: DocumentApprovalManagerProps) {
  const [selectedUserDocs, setSelectedUserDocs] = useState<Set<Id<"user_docs">>>(new Set());
  const [selectedVehicleDocs, setSelectedVehicleDocs] = useState<Set<Id<"vehicle_docs">>>(
    new Set(),
  );
  const [approvalNotes, setApprovalNotes] = useState("");
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<"approve" | "reject" | null>(null);
  const [currentDocType, setCurrentDocType] = useState<"user" | "vehicle" | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  // Queries
  const pendingUserDocs = useQuery(api.documentApproval.getPendingUserDocuments, { limit: 50 });
  const pendingVehicleDocs = useQuery(api.documentApproval.getPendingVehicleDocuments, {
    limit: 50,
  });
  const approvalStats = useQuery(api.documentApproval.getDocumentApprovalStats);

  // Mutations
  const approveUserDocuments = useMutation(api.documentApproval.approveUserDocuments);
  const approveVehicleDocuments = useMutation(api.documentApproval.approveVehicleDocuments);

  const handleUserDocSelection = (docId: Id<"user_docs">, checked: boolean) => {
    const newSelection = new Set(selectedUserDocs);
    if (checked) {
      newSelection.add(docId);
    } else {
      newSelection.delete(docId);
    }
    setSelectedUserDocs(newSelection);
  };

  const handleVehicleDocSelection = (docId: Id<"vehicle_docs">, checked: boolean) => {
    const newSelection = new Set(selectedVehicleDocs);
    if (checked) {
      newSelection.add(docId);
    } else {
      newSelection.delete(docId);
    }
    setSelectedVehicleDocs(newSelection);
  };

  const handleBulkAction = (action: "approve" | "reject", docType: "user" | "vehicle") => {
    const selectedCount = docType === "user" ? selectedUserDocs.size : selectedVehicleDocs.size;

    if (selectedCount === 0) {
      toast.error("Please select at least one document");
      return;
    }

    setCurrentAction(action);
    setCurrentDocType(docType);
    setIsApprovalDialogOpen(true);
  };

  const confirmBulkAction = async () => {
    if (!currentAction || !currentDocType) return;

    const selectedCount =
      currentDocType === "user" ? selectedUserDocs.size : selectedVehicleDocs.size;

    const result = await withErrorHandling(
      async () => {
        if (currentDocType === "user") {
          const documentIds = Array.from(selectedUserDocs);
          await approveUserDocuments({
            documentIds,
            status: currentAction === "approve" ? "approved" : "rejected",
            notes: approvalNotes || undefined,
          });
        } else {
          const documentIds = Array.from(selectedVehicleDocs);
          await approveVehicleDocuments({
            documentIds,
            status: currentAction === "approve" ? "approved" : "rejected",
            notes: approvalNotes || undefined,
          });
        }
      },
      {
        loadingMessage: `${
          currentAction === "approve" ? "Approving" : "Rejecting"
        } ${selectedCount} document(s)...`,
        successMessage: `Successfully ${currentAction}d ${selectedCount} document(s)`,
        errorMessage: `Failed to ${currentAction} documents`,
        successDismissible: true,
        successDuration: 4000, // Longer for bulk operations success
        errorDismissible: true,
        errorDuration: 7000, // Even longer for bulk operation errors
      },
    );

    if (result) {
      // Clear selections
      if (currentDocType === "user") {
        setSelectedUserDocs(new Set());
      } else {
        setSelectedVehicleDocs(new Set());
      }

      setApprovalNotes("");
      setIsApprovalDialogOpen(false);
      setCurrentAction(null);
      setCurrentDocType(null);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats Cards */}
      {approvalStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending User Docs</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalStats.userDocuments.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Vehicle Docs</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalStats.vehicleDocuments.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total User Docs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalStats.userDocuments.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicle Docs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalStats.vehicleDocuments.total}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="all">All Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {/* User Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Pending User Documents ({pendingUserDocs?.length || 0})
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleBulkAction("approve", "user")}
                    disabled={selectedUserDocs.size === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Selected ({selectedUserDocs.size})
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleBulkAction("reject", "user")}
                    disabled={selectedUserDocs.size === 0}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Selected ({selectedUserDocs.size})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {pendingUserDocs && pendingUserDocs.length > 0 ? (
                <div className="space-y-4">
                  {pendingUserDocs.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <Checkbox
                        checked={selectedUserDocs.has(doc._id)}
                        onCheckedChange={(checked) =>
                          handleUserDocSelection(doc._id, checked as boolean)
                        }
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{doc.kind}</span>
                            {getStatusBadge(doc.approvalStatus)}
                          </div>
                          {doc.downloadUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>User: {doc.user?.name || doc.user?.email || "Unknown"}</p>
                          <p>Uploaded: {formatDate(doc.createdAt)}</p>
                          {doc.expiry && <p>Expires: {formatDate(doc.expiry)}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>No pending user documents</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicle Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Pending Vehicle Documents ({pendingVehicleDocs?.length || 0})
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleBulkAction("approve", "vehicle")}
                    disabled={selectedVehicleDocs.size === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Selected ({selectedVehicleDocs.size})
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleBulkAction("reject", "vehicle")}
                    disabled={selectedVehicleDocs.size === 0}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Selected ({selectedVehicleDocs.size})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {pendingVehicleDocs && pendingVehicleDocs.length > 0 ? (
                <div className="space-y-4">
                  {pendingVehicleDocs.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <Checkbox
                        checked={selectedVehicleDocs.has(doc._id)}
                        onCheckedChange={(checked) =>
                          handleVehicleDocSelection(doc._id, checked as boolean)
                        }
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">
                              {VEHICLE_DOC_DISPLAY_NAMES[
                                doc.kind as keyof typeof VEHICLE_DOC_DISPLAY_NAMES
                              ] || doc.kind}
                            </span>
                            {getStatusBadge(doc.approvalStatus)}
                          </div>
                          {doc.downloadUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Vehicle: {doc.vehicle?.plate || "Unknown"}</p>
                          <p>Uploaded: {formatDate(doc.createdAt)}</p>
                          {doc.expiry && <p>Expires: {formatDate(doc.expiry)}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>No pending vehicle documents</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {/* All Documents - Similar structure but with filtered data */}
          <div className="text-muted-foreground text-sm">
            This section would show all documents with filters for approved/rejected status.
            Implementation can be extended based on specific requirements.
          </div>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentAction === "approve" ? "Approve" : "Reject"} Documents
            </DialogTitle>
            <DialogDescription>
              You are about to {currentAction}{" "}
              {currentDocType === "user" ? selectedUserDocs.size : selectedVehicleDocs.size}{" "}
              {currentDocType} document(s). This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="approval-notes">Notes (Optional)</Label>
              <Textarea
                id="approval-notes"
                placeholder="Add any notes or comments about this decision..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentAction === "approve" ? "default" : "destructive"}
              onClick={confirmBulkAction}
            >
              {currentAction === "approve" ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

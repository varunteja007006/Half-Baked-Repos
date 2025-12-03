"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, Users, Car } from "lucide-react";
import DocumentApprovalManager from "@/components/features/documents/DocumentApprovalManager";
import UserDocumentsTable from "./user-documents-table";

export default function DocumentManagement() {
  return (
    <div>
      <Tabs defaultValue="approval" className="space-y-6">
        <TabsList>
          <TabsTrigger value="approval" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Document Approval
          </TabsTrigger>
          <TabsTrigger value="user-docs" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Documents
          </TabsTrigger>
          <TabsTrigger value="vehicle-docs" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Vehicle Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approval">
          <DocumentApprovalManager />
        </TabsContent>

        <TabsContent value="user-docs">
          <Card>
            <CardHeader>
              <CardTitle>User Documents Overview</CardTitle>
              <CardDescription>
                Detailed view and management of all user documents in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserDocumentsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle-docs">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Documents Overview</CardTitle>
              <CardDescription>
                Detailed view and management of all vehicle documents in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                This section can be implemented to show detailed vehicle document analytics, expiry
                tracking, and renewal reminders.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

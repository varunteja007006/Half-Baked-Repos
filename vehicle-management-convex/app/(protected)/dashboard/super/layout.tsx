"use client";
import React from "react";

import { SuperAdminTabs } from "@/components/features/dashboard/Tabs";
import { ContextProtectedComponent, useAuth } from "@/components/features/auth";
import { ContentLayout } from "@/components/features/admin-panel/content-layout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isSuper } = useAuth();

  return (
    <ContentLayout title="Super Admin Dashboard">
      <div className="w-full space-y-6">
        <SuperAdminTabs />
        <ContextProtectedComponent
          requireAuth={true}
          requireRole={true}
          allowedCondition={isSuper}
          deniedTitle="Access Denied"
          deniedDescription="You don't have permission to access the dashboard."
        >
          {children}
        </ContextProtectedComponent>
      </div>
    </ContentLayout>
  );
}

"use client";
import React from "react";

import { DriverTabs } from "@/components/features/dashboard";
import { ContextProtectedComponent, useAuth } from "@/components/features/auth";
import { ContentLayout } from "@/components/features/admin-panel/content-layout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isDriver } = useAuth();

  return (
    <ContentLayout title="Driver Dashboard">
      <div className="w-full space-y-6">
        <DriverTabs />
        <ContextProtectedComponent
          requireAuth={true}
          requireRole={true}
          allowedCondition={isDriver}
          deniedTitle="Access Denied"
          deniedDescription="You don't have permission to access the dashboard."
        >
          {children}
        </ContextProtectedComponent>
      </div>
    </ContentLayout>
  );
}

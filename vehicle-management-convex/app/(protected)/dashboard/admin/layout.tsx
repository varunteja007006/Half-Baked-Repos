"use client";
import React from "react";

import { AdminTabs } from "@/components/features/dashboard";
import { ContextProtectedComponent, useAuth } from "@/components/features/auth";
import { ContentLayout } from "@/components/features/admin-panel/content-layout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAdmin } = useAuth();

  return (
    <ContentLayout title="Admin Dashboard">
      <div className="w-full space-y-6">
        <AdminTabs />
        <ContextProtectedComponent
          requireAuth={true}
          requireRole={true}
          allowedCondition={isAdmin}
          deniedTitle="Access Denied"
          deniedDescription="You don't have permission to access the dashboard."
        >
          {children}
        </ContextProtectedComponent>
      </div>
    </ContentLayout>
  );
}

"use client";

import React from "react";
import VehicleAnalyticsOverview from "@/components/features/analytics/VehicleAnalyticsOverview";
import RoleBasedNavigation from "@/components/features/navigation/RoleBasedNavigation";
import DashboardInsights from "@/components/features/analytics/DashboardInsights";
import FleetStatusSummary from "@/components/features/fleet/FleetStatusSummary";
import { ContextProtectedComponent, useAuth } from "@/components/features/auth";

export function DashboardLayout() {
  const { user, isAdmin, isSuper, isDriver } = useAuth();

  return (
    <ContextProtectedComponent
      requireAuth={true}
      requireRole={true}
      allowedCondition={isAdmin || isSuper || isDriver}
      deniedTitle="Access Denied"
      deniedDescription="You don't have permission to access the dashboard."
    >
      <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back{user?.appUser?.name ? `, ${user.appUser.name}` : ""}!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Here&apos;s what&apos;s happening with your fleet today.
          </p>
        </div>

        {/* Role-based Navigation */}
        <RoleBasedNavigation />

        {/* Dashboard Analytics */}
        <DashboardInsights />

        {/* Vehicle Analytics Overview */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 sm:mb-2">
              Vehicle Analytics
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive overview of your vehicle fleet performance and metrics.
            </p>
          </div>
          <VehicleAnalyticsOverview />
        </div>

        {/* Fleet Status Summary */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 sm:mb-2">
              Fleet Operations
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Real-time status and recent activity from your vehicle fleet.
            </p>
          </div>
          <FleetStatusSummary />
        </div>
      </div>
    </ContextProtectedComponent>
  );
}

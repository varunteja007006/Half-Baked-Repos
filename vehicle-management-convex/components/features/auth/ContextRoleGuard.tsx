"use client";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ContextAuthGuard from "./ContextAuthGuard";

interface ContextRoleGuardProps {
  readonly allowedCondition: boolean;
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly authFallback?: React.ReactNode;
  readonly loadingFallback?: React.ReactNode;
  readonly deniedTitle?: string;
  readonly deniedDescription?: string;
}

interface RoleValidationProps {
  readonly allowedCondition: boolean;
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly deniedTitle: string;
  readonly deniedDescription: string;
}

// Role validation component (to be wrapped by ContextAuthGuard)
function RoleValidation({
  allowedCondition,
  children,
  fallback,
  deniedTitle,
  deniedDescription,
}: RoleValidationProps) {
  // At this point, user is guaranteed to be authenticated by ContextAuthGuard
  if (!allowedCondition) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{deniedTitle}</CardTitle>
              <CardDescription>{deniedDescription}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )
    );
  }

  return <>{children}</>;
}

/**
 * ContextRoleGuard component that wraps ContextAuthGuard and adds role-based authorization.
 * First ensures the user is authenticated, then checks role permissions.
 */
export default function ContextRoleGuard({
  allowedCondition,
  children,
  fallback,
  authFallback,
  loadingFallback,
  deniedTitle = "Access Denied",
  deniedDescription = "You don't have permission to access this content.",
}: Readonly<ContextRoleGuardProps>) {
  return (
    <ContextAuthGuard fallback={authFallback} loadingFallback={loadingFallback}>
      <RoleValidation
        allowedCondition={allowedCondition}
        fallback={fallback}
        deniedTitle={deniedTitle}
        deniedDescription={deniedDescription}
      >
        {children}
      </RoleValidation>
    </ContextAuthGuard>
  );
}

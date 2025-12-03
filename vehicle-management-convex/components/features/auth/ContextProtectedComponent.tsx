"use client";

import React from "react";
import ContextAuthGuard from "./ContextAuthGuard";
import ContextRoleGuard from "./ContextRoleGuard";

interface ContextProtectedComponentProps {
  readonly allowedCondition?: boolean;
  readonly children: React.ReactNode;
  readonly authFallback?: React.ReactNode;
  readonly roleFallback?: React.ReactNode;
  readonly loadingFallback?: React.ReactNode;
  readonly deniedTitle?: string;
  readonly deniedDescription?: string;
  readonly requireAuth?: boolean;
  readonly requireRole?: boolean;
}

/**
 * ContextProtectedComponent combines both authentication and authorization checks
 * using the AuthContext. No need to pass user as prop - it's automatically fetched.
 *
 * @param allowedCondition - Boolean condition for role-based access (required if requireRole is true)
 * @param children - Components to render if all checks pass
 * @param authFallback - Custom fallback for authentication failure
 * @param roleFallback - Custom fallback for authorization failure
 * @param loadingFallback - Custom fallback for loading state
 * @param deniedTitle - Custom title for access denied message
 * @param deniedDescription - Custom description for access denied message
 * @param requireAuth - Whether to check authentication (default: true)
 * @param requireRole - Whether to check authorization (default: false)
 */
export default function ContextProtectedComponent({
  allowedCondition,
  children,
  authFallback,
  roleFallback,
  loadingFallback,
  deniedTitle,
  deniedDescription,
  requireAuth = true,
  requireRole = false,
}: Readonly<ContextProtectedComponentProps>) {
  // If only auth check is needed
  if (requireAuth && !requireRole) {
    return (
      <ContextAuthGuard fallback={authFallback} loadingFallback={loadingFallback}>
        {children}
      </ContextAuthGuard>
    );
  }

  // If only role check is needed (ContextRoleGuard handles auth internally)
  if (!requireAuth && requireRole && allowedCondition !== undefined) {
    return (
      <ContextRoleGuard
        allowedCondition={allowedCondition}
        fallback={roleFallback}
        authFallback={authFallback}
        loadingFallback={loadingFallback}
        deniedTitle={deniedTitle}
        deniedDescription={deniedDescription}
      >
        {children}
      </ContextRoleGuard>
    );
  }

  // If both auth and role checks are needed (ContextRoleGuard handles both)
  if (requireAuth && requireRole && allowedCondition !== undefined) {
    return (
      <ContextRoleGuard
        allowedCondition={allowedCondition}
        fallback={roleFallback}
        authFallback={authFallback}
        loadingFallback={loadingFallback}
        deniedTitle={deniedTitle}
        deniedDescription={deniedDescription}
      >
        {children}
      </ContextRoleGuard>
    );
  }

  // If no checks are required, just render children
  return <>{children}</>;
}

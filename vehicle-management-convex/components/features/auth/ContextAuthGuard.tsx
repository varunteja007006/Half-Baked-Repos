"use client";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./AuthContext";

interface ContextAuthGuardProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly loadingFallback?: React.ReactNode;
}

/**
 * ContextAuthGuard component that automatically fetches user data from AuthContext
 * and checks if a user is authenticated. No need to pass user as prop.
 */
export default function ContextAuthGuard({
  children,
  fallback,
  loadingFallback,
}: Readonly<ContextAuthGuardProps>) {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      loadingFallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Please wait while we verify your authentication.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )
    );
  }

  // Show auth required if not authenticated
  if (!isAuthenticated || !user) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please log in to access this content.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )
    );
  }

  return <>{children}</>;
}

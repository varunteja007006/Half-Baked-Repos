"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoggedInUser } from "@/lib/types/types";

// Type that matches the actual loggedInUser query response from Convex
type LoggedInUserResult = LoggedInUser;
type AuthContextUser = NonNullable<LoggedInUserResult>;

interface AuthContextValue {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  // Convenience getters for role checks
  isAdmin: boolean;
  isSuper: boolean;
  isDriver: boolean;
  hasAnyRole: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}

/**
 * AuthProvider component that fetches the logged-in user from Convex
 * and provides authentication state to all child components.
 */
export function AuthProvider({ children, fallback }: Readonly<AuthProviderProps>) {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const isLoading = loggedInUser === undefined;
  const isAuthenticated = loggedInUser !== null && loggedInUser !== undefined;

  // Convenience role checks
  const isAdmin = loggedInUser?.isAdminUser || false;
  const isSuper = loggedInUser?.isSuperUser || false;
  const isDriver = loggedInUser?.isDriverUser || false;
  const hasAnyRole = isAdmin || isSuper || isDriver;

  const value: AuthContextValue = useMemo(
    () => ({
      user: loggedInUser || null,
      isLoading,
      isAuthenticated,
      isAdmin,
      isSuper,
      isDriver,
      hasAnyRole,
    }),
    [loggedInUser, isLoading, isAuthenticated, isAdmin, isSuper, isDriver, hasAnyRole],
  );

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      fallback || (
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access the authentication context.
 * Must be used within an AuthProvider.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export the context for advanced use cases
export { AuthContext };

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND_NAME, BRAND_ICON } from "@/lib/config/brand";
import { Home, RefreshCw, AlertTriangle, ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Readonly<ErrorProps>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/5 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center space-y-8">
          {/* Brand Header */}
          <div className="flex items-center justify-center text-primary">
            {BRAND_ICON}
            <span className="text-lg font-semibold ml-2">{BRAND_NAME}</span>
          </div>

          {/* Error Illustration */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">System Malfunction</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Our vehicle management system encountered an unexpected error. Don&apos;t worry, our
              team has been notified.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <p className="text-sm font-mono text-destructive break-all">{error.message}</p>
                  {error.digest && (
                    <p className="text-xs text-muted-foreground mt-2">Error ID: {error.digest}</p>
                  )}
                </div>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button onClick={reset} size="lg" className="w-full sm:w-auto flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Link>
            </Button>

            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please contact support with the error ID above.
            </p>
            <div className="flex items-center justify-center gap-1 mt-2 text-muted-foreground">
              <span className="text-sm">Our fleet keeps moving, even when things go wrong</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

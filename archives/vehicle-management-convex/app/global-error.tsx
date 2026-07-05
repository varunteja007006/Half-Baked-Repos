"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND_NAME, BRAND_ICON } from "@/lib/config/brand";
import { Home, RefreshCw, AlertCircle, ArrowLeft } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/10">
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-background/90 backdrop-blur-sm">
            <CardContent className="p-12 text-center space-y-8">
              {/* Brand Header */}
              <div className="flex items-center justify-center text-primary">
                {BRAND_ICON}
                <span className="text-lg font-semibold ml-2">{BRAND_NAME}</span>
              </div>

              {/* Critical Error Illustration */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-destructive/15 rounded-full flex items-center justify-center animate-pulse">
                  <AlertCircle className="w-16 h-16 text-destructive" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">Critical System Error</h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  A critical error occurred in our vehicle management system. The application needs
                  to be restarted to ensure data integrity.
                </p>

                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === "development" && (
                  <details className="mt-6 text-left">
                    <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                      Critical Error Details (Development)
                    </summary>
                    <div className="mt-2 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                      <p className="text-sm font-mono text-destructive break-all">
                        {error.message}
                      </p>
                      {error.stack && (
                        <pre className="text-xs text-muted-foreground mt-2 overflow-auto">
                          {error.stack}
                        </pre>
                      )}
                      {error.digest && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Error ID: {error.digest}
                        </p>
                      )}
                    </div>
                  </details>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  onClick={reset}
                  size="lg"
                  className="w-full sm:w-auto flex items-center gap-2"
                  variant="destructive"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart Application
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Try Dashboard
                  </Link>
                </Button>

                <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Go to Home
                  </Link>
                </Button>
              </div>

              {/* Critical Help Text */}
              <div className="pt-8 border-t border-destructive/20">
                <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">🚨 Critical Error Notice</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This is a system-level error that affects the entire application. Please contact
                    your system administrator if the problem persists.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}

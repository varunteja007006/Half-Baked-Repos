/**
 * Error Testing Component
 *
 * This component can be used to test the error boundaries and pages.
 * Add this to any page to test error handling:
 *
 * import { ErrorTestComponent } from '@/components/error-test';
 * <ErrorTestComponent />
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bug } from "lucide-react";

export function ErrorTestComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(
      "Test error triggered by user - This is a simulated error for testing the error boundary",
    );
  }

  const triggerError = () => {
    setShouldThrow(true);
  };

  const triggerAsyncError = async () => {
    // Simulate an async error
    setTimeout(() => {
      throw new Error("Async test error - This error occurred asynchronously");
    }, 100);
  };

  return (
    <Card className="w-full max-w-md border-destructive/20 bg-destructive/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Bug className="w-5 h-5" />
          Error Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Test the error handling components (development only)
        </p>

        <div className="flex flex-col gap-2">
          <Button
            onClick={triggerError}
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Trigger Sync Error
          </Button>

          <Button
            onClick={triggerAsyncError}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-destructive/20 text-destructive hover:bg-destructive/10"
          >
            <AlertTriangle className="w-4 h-4" />
            Trigger Async Error
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">Note: Remove this component in production</p>
      </CardContent>
    </Card>
  );
}

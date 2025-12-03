import { Card, CardContent } from "@/components/ui/card";

import { BRAND_NAME, BRAND_ICON } from "@/lib/config/brand";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-center text-primary">
            {BRAND_ICON}
            <span className="text-lg font-semibold ml-2">{BRAND_NAME}</span>
          </div>

          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-16 h-16 mx-auto">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Starting Engine...</h2>
            <p className="text-sm text-muted-foreground">
              Preparing your vehicle management dashboard
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
            <div className="bg-primary h-1 rounded-full w-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

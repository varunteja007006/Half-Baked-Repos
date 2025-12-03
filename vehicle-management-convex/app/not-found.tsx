import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND_NAME, BRAND_ICON } from "@/lib/config/brand";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center space-y-8">
          {/* Brand Header */}
          <div className="flex items-center justify-center text-primary">
            {BRAND_ICON}
            <span className="text-lg font-semibold ml-2">{BRAND_NAME}</span>
          </div>

          {/* 404 Illustration */}
          <div className="relative">
            <div className="text-8xl font-bold text-primary/20 select-none">404</div>
            <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary/60" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Route Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Looks like this vehicle took a wrong turn! The page you&apos;re looking for
              doesn&apos;t exist in our fleet management system.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Need help? Our vehicle management system has many features to explore.
            </p>
            <div className="flex items-center justify-center gap-1 mt-2 text-primary">
              <Search className="w-4 h-4" />
              <span className="text-sm">Try searching from the dashboard</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

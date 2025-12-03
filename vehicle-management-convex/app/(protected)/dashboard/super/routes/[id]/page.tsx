"use client";

import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Route, CreditCard } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatCurrency } from "@/lib/utils/currency.utils";

export default function RouteViewPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params?.id as Id<"routes">;

  const route = useQuery(api.route.getRouteWithDetails, {
    id: routeId,
  });

  if (!route) {
    return (
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Not specified";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{route.name}</h1>
            {route.routeType && (
              <Badge variant="secondary" className="mt-1">
                {route.routeType.name}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Route Name</label>
              <p className="text-lg font-medium">{route.name}</p>
            </div>

            {route.routeType && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Route Type</label>
                <p>{route.routeType.name}</p>
                {route.routeType.description && (
                  <p className="text-sm text-muted-foreground">{route.routeType.description}</p>
                )}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground">Base Amount</label>
              <p className="text-lg font-semibold">{formatCurrency(route.baseAmount)}</p>
            </div>

            {route.company && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company</label>
                <p>{route.company.name}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Route Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Start Location */}
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Start Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p>{route.startAddress || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">State</label>
                  <p>{route.startState || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pincode</label>
                  <p>{route.startPincode || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    GPS Coordinates
                  </label>
                  <p className="text-sm font-mono">{route.startLocation || "Not specified"}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* End Location */}
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                End Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p>{route.endAddress || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">State</label>
                  <p>{route.endState || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pincode</label>
                  <p>{route.endPincode || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    GPS Coordinates
                  </label>
                  <p className="text-sm font-mono">{route.endLocation || "Not specified"}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Trip Information */}
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Trip Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Distance</label>
                  <p>{route.distance ? `${route.distance} km` : "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Estimated Duration
                  </label>
                  <p>{formatDuration(route.estimatedDuration)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="font-medium text-muted-foreground">Created At</label>
              <p>{new Date(route.createdAt).toLocaleString()}</p>
            </div>
            {route.updatedAt && (
              <div>
                <label className="font-medium text-muted-foreground">Last Updated</label>
                <p>{new Date(route.updatedAt).toLocaleString()}</p>
              </div>
            )}
            <div>
              <label className="font-medium text-muted-foreground">Status</label>
              <Badge variant={route.isActive !== false ? "default" : "destructive"}>
                {route.isActive !== false ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

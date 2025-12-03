"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Truck, MapPin, Clock, AlertTriangle, CheckCircle, User, ExternalLink } from "lucide-react";

// Mock data - replace with real data from Convex later
const recentTrips = [
  {
    id: "TRP-001",
    vehicle: "VH-2023-001",
    driver: "John Doe",
    route: "City Center → Airport",
    status: "completed",
    duration: "45 min",
    distance: "12.5 km",
    startTime: "09:30 AM",
  },
  {
    id: "TRP-002",
    vehicle: "VH-2023-005",
    driver: "Sarah Wilson",
    route: "Downtown → Industrial Zone",
    status: "in-progress",
    duration: "25 min",
    distance: "8.2 km",
    startTime: "10:15 AM",
  },
  {
    id: "TRP-003",
    vehicle: "VH-2023-012",
    driver: "Mike Johnson",
    route: "Suburb → City Center",
    status: "scheduled",
    duration: "35 min",
    distance: "15.3 km",
    startTime: "11:00 AM",
  },
];

const vehicleAlerts = [
  {
    vehicle: "VH-2023-008",
    type: "maintenance",
    message: "Oil change due in 200 km",
    priority: "medium",
    dueDate: "2025-09-15",
  },
  {
    vehicle: "VH-2023-003",
    type: "inspection",
    message: "Annual inspection overdue",
    priority: "high",
    dueDate: "2025-09-01",
  },
  {
    vehicle: "VH-2023-015",
    type: "fuel",
    message: "Low fuel level reported",
    priority: "low",
    dueDate: "Today",
  },
];

export default function FleetStatusSummary() {
  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      scheduled: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    };

    const icons = {
      completed: CheckCircle,
      "in-progress": Clock,
      scheduled: Clock,
    };

    const IconComponent = icons[status as keyof typeof icons];

    return (
      <Badge variant="secondary" className={styles[status as keyof typeof styles]}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      medium: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    };

    return (
      <Badge variant="secondary" className={styles[priority as keyof typeof styles]}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border p-4 bg-card">
          <h3 className="font-semibold mb-2">Total Vehicles</h3>
          <div className="text-2xl font-bold text-blue-600">25</div>
          <p className="text-sm text-muted-foreground">Active fleet</p>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <h3 className="font-semibold mb-2">Active Trips</h3>
          <div className="text-2xl font-bold text-green-600">12</div>
          <p className="text-sm text-muted-foreground">Currently running</p>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <h3 className="font-semibold mb-2">Maintenance Due</h3>
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <p className="text-sm text-muted-foreground">Needs attention</p>
        </div>
      </div>

      {/* Recent Trips */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Recent Trips
            </CardTitle>
            <CardDescription>Latest trip activities across your fleet</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Start Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        {trip.vehicle}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {trip.driver}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{trip.route}</TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{trip.duration}</div>
                        <div className="text-muted-foreground">{trip.distance}</div>
                      </div>
                    </TableCell>
                    <TableCell>{trip.startTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Vehicle Alerts
            </CardTitle>
            <CardDescription>Maintenance and operational notifications</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Manage All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vehicleAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{alert.vehicle}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">Due: {alert.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(alert.priority)}
                  <Badge variant="outline" className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

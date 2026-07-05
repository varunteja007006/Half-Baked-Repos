"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Truck, Users, Calendar, AlertTriangle } from "lucide-react";

// Mock data - replace with real data later
const vehicleStatusData = [
  { name: "Active", value: 45, color: "#22c55e" },
  { name: "Maintenance", value: 8, color: "#f59e0b" },
  { name: "Inactive", value: 3, color: "#ef4444" },
];

const monthlyTripsData = [
  { month: "Jan", trips: 245 },
  { month: "Feb", trips: 289 },
  { month: "Mar", trips: 312 },
  { month: "Apr", trips: 267 },
  { month: "May", trips: 334 },
  { month: "Jun", trips: 298 },
];

const driverPerformanceData = [
  { driver: "John D.", score: 95, trips: 42 },
  { driver: "Sarah M.", score: 92, trips: 38 },
  { driver: "Mike R.", score: 88, trips: 35 },
  { driver: "Lisa K.", score: 94, trips: 41 },
  { driver: "Tom W.", score: 87, trips: 29 },
];

export default function VehicleAnalyticsOverview() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Key Metrics Cards */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-sm font-medium truncate pr-2">Total Vehicles</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="text-xl sm:text-2xl font-bold">56</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-sm font-medium truncate pr-2">Active Drivers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="text-xl sm:text-2xl font-bold">34</div>
          <p className="text-xs text-muted-foreground">+1 from last week</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-sm font-medium truncate pr-2">Monthly Trips</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="text-xl sm:text-2xl font-bold">298</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-sm font-medium truncate pr-2">Maintenance Due</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="text-xl sm:text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">3 urgent, 5 scheduled</p>
        </CardContent>
      </Card>

      {/* Monthly Trips Chart */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-base sm:text-lg">Monthly Trip Trends</CardTitle>
          <CardDescription className="text-sm">
            Number of trips completed each month
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <ChartContainer
            config={{
              trips: {
                label: "Trips",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTripsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} tickMargin={8} />
                <YAxis fontSize={12} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="trips"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Vehicle Status Distribution */}
      <Card className="col-span-full sm:col-span-1 lg:col-span-1">
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-base sm:text-lg">Vehicle Status</CardTitle>
          <CardDescription className="text-sm">Current status of all vehicles</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <ChartContainer
            config={{
              active: { label: "Active", color: "#22c55e" },
              maintenance: { label: "Maintenance", color: "#f59e0b" },
              inactive: { label: "Inactive", color: "#ef4444" },
            }}
          >
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-3 sm:mt-4 space-y-2">
            {vehicleStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm truncate">{item.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Driver Performance */}
      <Card className="col-span-full sm:col-span-1 lg:col-span-1">
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-base sm:text-lg">Top Drivers</CardTitle>
          <CardDescription className="text-sm">Performance scores this month</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="space-y-3">
            {driverPerformanceData.map((driver, index) => (
              <div key={driver.driver} className="flex items-center space-x-3">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-medium truncate">{driver.driver}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <Badge variant="outline" className="text-xs w-fit">
                      Score: {driver.score}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">{driver.trips} trips</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

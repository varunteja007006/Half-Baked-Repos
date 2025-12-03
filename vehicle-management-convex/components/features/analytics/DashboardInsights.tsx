"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Fuel, Clock, DollarSign, Activity } from "lucide-react";

// Mock data - replace with real data later
const insights = [
  {
    title: "Fuel Efficiency",
    value: "12.5 km/l",
    change: "+2.3%",
    trend: "up",
    description: "Average across all vehicles",
    progress: 75,
    icon: Fuel,
    color: "text-green-600",
  },
  {
    title: "On-Time Performance",
    value: "94.2%",
    change: "+1.8%",
    trend: "up",
    description: "Trips completed on schedule",
    progress: 94,
    icon: Clock,
    color: "text-blue-600",
  },
  {
    title: "Monthly Revenue",
    value: "$42,350",
    change: "-5.2%",
    trend: "down",
    description: "This month vs last month",
    progress: 68,
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Vehicle Utilization",
    value: "87.3%",
    change: "+3.1%",
    trend: "up",
    description: "Fleet capacity usage",
    progress: 87,
    icon: Activity,
    color: "text-orange-600",
  },
];

const alerts = [
  {
    type: "warning",
    title: "Maintenance Overdue",
    description: "3 vehicles require immediate attention",
    time: "2 hours ago",
  },
  {
    type: "info",
    title: "Route Optimization",
    description: "New efficient routes available for review",
    time: "1 day ago",
  },
  {
    type: "success",
    title: "Fuel Savings",
    description: "15% reduction in fuel costs this month",
    time: "2 days ago",
  },
];

export default function DashboardInsights() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Performance Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 px-1">Performance Insights</h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight) => {
            const IconComponent = insight.icon;
            const TrendIcon = insight.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor = insight.trend === "up" ? "text-green-600" : "text-red-600";

            return (
              <Card key={insight.title} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-sm font-medium truncate pr-2">
                    {insight.title}
                  </CardTitle>
                  <IconComponent className={`h-4 w-4 ${insight.color} flex-shrink-0`} />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-xl sm:text-2xl font-bold">{insight.value}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`flex items-center space-x-1 ${trendColor}`}>
                      <TrendIcon className="h-3 w-3" />
                      <span className="text-xs font-medium">{insight.change}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {insight.description}
                  </p>
                  <Progress value={insight.progress} className="mt-3 h-2" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 px-1">Recent Alerts</h3>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              {alerts.map((alert, index) => {
                const alertStyles = {
                  warning: "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20",
                  info: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
                  success: "border-l-green-500 bg-green-50 dark:bg-green-950/20",
                };

                const badgeStyles = {
                  warning:
                    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
                  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
                  success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
                };

                return (
                  <div
                    key={index}
                    className={`p-3 border-l-4 rounded-r-lg ${
                      alertStyles[alert.type as keyof typeof alertStyles]
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                          <Badge
                            variant="secondary"
                            className={`text-xs w-fit ${
                              badgeStyles[alert.type as keyof typeof badgeStyles]
                            }`}
                          >
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap self-start sm:self-center">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

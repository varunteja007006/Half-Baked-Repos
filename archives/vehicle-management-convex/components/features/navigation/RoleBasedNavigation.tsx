"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRoleConfigs } from "@/hooks/use-role-configs";

export default function RoleBasedNavigation() {
  const { availableRoleConfigs, availableRoles } = useRoleConfigs();

  // If no roles available, show message (this shouldn't happen if properly guarded)
  if (availableRoles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Dashboard Access</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access any dashboard features.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quick Access</h2>
          <p className="text-muted-foreground">Navigate to different areas based on your roles</p>
        </div>
        <div className="w-full flex flex-row items-center gap-2">
          {availableRoles.map((role) => {
            const config = availableRoleConfigs[role];
            return (
              <Badge key={role} variant="secondary" className="flex items-center gap-1">
                <config.icon className="h-3 w-3" />
                {config.title}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableRoles.map((role) => {
          const config = availableRoleConfigs[role];
          const IconComponent = config.icon;

          return (
            <Card key={role} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{config.title}</CardTitle>
                    <CardDescription className="text-sm">{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {config.actions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <Link key={action.href} href={action.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 group/item hover:bg-muted/50"
                        >
                          <div className="flex items-start space-x-3 text-left">
                            <ActionIcon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover/item:text-foreground" />
                            <div>
                              <div className="font-medium text-sm">{action.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {action.description}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useAuth } from "@/components/features/auth";
import {
  Shield,
  UserCheck,
  Truck,
  BarChart3,
  Users,
  FileText,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
  Car,
  User,
  Route,
  Building,
} from "lucide-react";

const roleConfigs = {
  super: {
    title: "Super Admin",
    description: "Complete system control and management",
    icon: Shield,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    badgeColor: "bg-purple-500",
    actions: [
      {
        label: "Trip Management",
        href: "/dashboard/super/trips-management",
        icon: MapPin,
        description: "Manage trips and assignments",
        tabId: "trip-management",
      },
      {
        label: "Vehicle Management",
        href: "/dashboard/super/vehicles",
        icon: Car,
        description: "Manage vehicles and manufacturers",
        tabId: "vehicle-management",
      },
      {
        label: "Company Management",
        href: "/dashboard/super/companies",
        icon: Building,
        description: "Manage companies and their details",
        tabId: "company-management",
      },
      {
        label: "Route Management",
        href: "/dashboard/super/routes",
        icon: Route,
        description: "Manage routes and their details",
        tabId: "route-management",
      },
      {
        label: "User Management",
        href: "/dashboard/super/users",
        icon: Users,
        tabId: "user-management",
        description: "Manage all users and permissions",
      },
      {
        label: "Document Management",
        href: "/dashboard/super/documents",
        icon: FileCheck,
        description: "Manage all documents and files",
        tabId: "document-management",
      },
      {
        label: "Analytics Hub",
        href: "/dashboard/super/analytics",
        icon: BarChart3,
        description: "Comprehensive system analytics",
        tabId: "analytics-hub",
      },
    ],
  },
  admin: {
    title: "Administrator",
    description: "Fleet and operations management",
    icon: UserCheck,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    badgeColor: "bg-blue-500",
    actions: [
      {
        label: "Fleet Overview",
        href: "/dashboard/admin/fleet",
        icon: Truck,
        description: "Manage vehicles and assignments",
        tabId: "fleet-overview",
      },
      {
        label: "Driver Management",
        href: "/dashboard/admin/drivers",
        icon: Users,
        description: "Oversee driver records and performance",
        tabId: "driver-management",
      },
      {
        label: "Reports",
        href: "/dashboard/admin/reports",
        icon: FileText,
        description: "Generate operational reports",
        tabId: "reports",
      },
    ],
  },
  driver: {
    title: "Driver",
    description: "Vehicle operations and trip management",
    icon: Truck,
    color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    badgeColor: "bg-green-500",
    actions: [
      {
        label: "My Profile",
        href: "/dashboard/driver/profile",
        icon: User,
        description: "View your Profile and Trip Details",
        tabId: "my-profile",
      },
      {
        label: "Trip Logs",
        href: "/dashboard/driver/trips",
        tabId: "trip-logs",
        icon: MapPin,
        description: "Log and track your trips",
      },
      {
        label: "Schedule",
        href: "/dashboard/driver/schedule",
        icon: Calendar,
        description: "View your assigned routes",
        tabId: "schedule",
      },
      {
        label: "Maintenance",
        href: "/dashboard/driver/maintenance",
        icon: AlertCircle,
        description: "Report vehicle issues",
        tabId: "maintenance",
      },
    ],
  },
} as const;

export type RoleConfigKey = keyof typeof roleConfigs;
export type RoleConfig = (typeof roleConfigs)[RoleConfigKey];

interface UseRoleConfigsReturn {
  availableRoleConfigs: Record<RoleConfigKey, RoleConfig>;
  availableRoles: RoleConfigKey[];
  userRoles: {
    isAdmin: boolean;
    isSuper: boolean;
    isDriver: boolean;
  };
}

/**
 * Custom hook that returns role configurations based on the logged-in user's roles.
 *
 * NOTE: This hook assumes the user is already authenticated. Components using this hook
 * should be wrapped with ContextAuthGuard or ContextProtectedComponent to handle
 * authentication and loading states.
 *
 * @returns Object containing:
 * - availableRoleConfigs: Role configurations that the user has access to
 * - availableRoles: Array of role keys that the user has
 * - userRoles: Boolean flags for each role type
 */
export function useRoleConfigs(): UseRoleConfigsReturn {
  const { user: loggedInUser } = useAuth();

  const result = useMemo(() => {
    // This hook assumes user is authenticated, so loggedInUser should not be null
    // If it is null, it means the component is not properly wrapped with auth guards
    if (!loggedInUser) {
      console.warn("useRoleConfigs: Component should be wrapped with authentication guards");
      return {
        availableRoleConfigs: {} as Record<RoleConfigKey, RoleConfig>,
        availableRoles: [] as RoleConfigKey[],
        userRoles: {
          isAdmin: false,
          isSuper: false,
          isDriver: false,
        },
      };
    }

    // User is authenticated, determine available roles
    const { isAdminUser, isSuperUser, isDriverUser } = loggedInUser;

    const availableRoles: RoleConfigKey[] = [];
    const availableRoleConfigs: Record<string, RoleConfig> = {};

    if (isSuperUser) {
      availableRoles.push("super");
      availableRoleConfigs.super = roleConfigs.super;
    }

    if (isAdminUser) {
      availableRoles.push("admin");
      availableRoleConfigs.admin = roleConfigs.admin;
    }

    if (isDriverUser) {
      availableRoles.push("driver");
      availableRoleConfigs.driver = roleConfigs.driver;
    }

    return {
      availableRoleConfigs: availableRoleConfigs as Record<RoleConfigKey, RoleConfig>,
      availableRoles,
      userRoles: {
        isAdmin: isAdminUser || false,
        isSuper: isSuperUser || false,
        isDriver: isDriverUser || false,
      },
    };
  }, [loggedInUser]);

  return result;
}

/**
 * Helper hook that returns only the role configurations without additional metadata.
 * Useful when you only need the configs themselves.
 */
export function useAvailableRoleConfigs(): Record<RoleConfigKey, RoleConfig> {
  const { availableRoleConfigs } = useRoleConfigs();
  return availableRoleConfigs;
}

/**
 * Helper hook that returns the array of available role keys.
 * Useful for conditional rendering or mapping operations.
 */
export function useAvailableRoles(): RoleConfigKey[] {
  const { availableRoles } = useRoleConfigs();
  return availableRoles;
}

/**
 * Helper hook that returns boolean flags for user roles.
 * Useful when you only need to check user permissions.
 *
 * NOTE: This hook assumes the user is already authenticated. Components using this hook
 * should be wrapped with ContextAuthGuard or ContextProtectedComponent.
 */
export function useUserRoles() {
  const { userRoles } = useRoleConfigs();
  return userRoles;
}

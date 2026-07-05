import { Doc, Id } from "@/convex/_generated/dataModel";
import { Role } from "@/lib/types/types";

export type UserType = {
  name: string;
  email: string;
  roles: string;
  createdAt: number | null;
};

// Type for the transformed user data used in the table
export interface UserTableRow {
  id: Id<"app_users">;
  name: string;
  email: string;
  roles: string;
  createdAt: number | null;
  isActive: boolean;
}

// User role interface based on the userRoles table schema
export interface UserRole {
  _id: Id<"userRoles">;
  userId: Id<"app_users">;
  role: Role;
  createdAt?: number;
  createdBy?: Id<"app_users">;
  updatedAt?: number;
  updatedBy?: Id<"app_users">;
  isActive?: boolean;
  deletedAt?: number;
  deletedBy?: Id<"app_users">;
  _creationTime: number;
}

// Result type from adminListUsers query
export interface AdminListUsersResult {
  appUser: Doc<"app_users">;
  user: Doc<"users"> | null;
  roles: UserRole[];
}

/**
 * Shared types for authentication and authorization components
 */
export interface UserRole {
  role: string;
}

export interface User {
  userRoles: UserRole[];
  name?: string;
  isAdmin?: boolean;
  isSuper?: boolean;
  isDriver?: boolean;
}

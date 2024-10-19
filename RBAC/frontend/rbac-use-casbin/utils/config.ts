"use client";
import { users } from "@/utils/utils";
import * as casbinAuth from "casbin.js";

// can be defined in a JSON or database to allow
const permDefs = {
  marketing: {
    read: ["MarketingView", "Proposal"],
  },
  IT: {
    read: ["Contact", "Database"],
    delete: ["Database"],
  },
};

export const casbinAuthorizer: any = null;
// console.log(enforcer.prototype.addPermissionForUser("Jill", "read", "Contact"));

export default function defineRulesFor(user: string) {
  // superUser roles definition
  const builtPerms: Record<string, any> = {};
  // perms should be of format
  // { 'read': ['Contact', 'Database']}
  users[user].roles.forEach((i) => {
    const role = i as keyof typeof permDefs | "superuser";
    if (role === "superuser") {
      Object.entries(permDefs).forEach(([_, value]) => {
        Object.entries(value).forEach(([key, value]) => {
          builtPerms[key] = [...(builtPerms[key] || []), ...value];
        });
      });
    } else if (permDefs[role] !== undefined) {
      const permissions = permDefs[role];
      Object.entries(permissions).forEach(([key, value]) => {
        builtPerms[key] = [...(builtPerms[key] || []), ...value];
      });
    }
  });

  console.log(builtPerms);
  //   casbinAuth.setPermission(builtPerms);
}

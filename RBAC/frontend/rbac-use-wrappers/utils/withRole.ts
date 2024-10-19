"use client";
import React from "react";

import { Context, users, AppContext } from "@/utils/utils";

const withRole =
  (roles: Array<string>) =>
  (Component: React.FC<any>, onDeny?: React.FC<any>) =>
  (props: any) => {
    // get current user roles from context (can be from token for from redux store)
    const context: AppContext = React.useContext(Context);
    if (!context) {
      return null;
    }

    const user = context.state.user as keyof typeof users; // 'basicUser' | 'intermediate' | 'superUser'

    const userRoles = users[user].roles || [];

    const hasAccess =
      userRoles.includes("superuser") ||
      userRoles.some((r) => roles.includes(r));

    if (hasAccess) return React.createElement(Component, props, null);

    if (onDeny) return React.createElement(onDeny, props, null);

    return null;
  };

export default withRole;

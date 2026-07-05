 "use client";
 import React from "react";
 import { Context, users, AppContext } from "@/utils/utils";
 
 const withRole = (roles: Array<string>) => 
   (Component: React.ComponentType<any>, onDeny?: React.ComponentType<any>) => 
     React.forwardRef((props: any, ref: any) => {
       // get current user roles from context (can be from token or from redux store)
       const context: AppContext = React.useContext(Context);
       if (!context) {
         return null;
       }
       
       const user = context.state.user as keyof typeof users; // 'basicUser' | 'intermediate' | 'superUser'
       const userRoles = users[user].roles || [];
       
       const hasAccess =
         userRoles.includes("superuser") ||
         userRoles.some((r) => roles.includes(r));
       
       if (hasAccess) return React.createElement(Component, { ...props, ref }, null);
       if (onDeny) return React.createElement(onDeny, { ...props, ref }, null);
       
       return null;
     });
 
 export default withRole;
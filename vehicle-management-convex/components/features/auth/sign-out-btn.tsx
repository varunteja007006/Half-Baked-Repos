"use client";
import { Button } from "@/components/ui/button";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";

export default function SignOut() {
  const { signOut } = useAuthActions();

  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Button onClick={() => void signOut()} className="cursor-pointer">
      Sign Out
    </Button>
  );
}

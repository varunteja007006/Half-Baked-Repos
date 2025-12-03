"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { FaGoogle } from "react-icons/fa";

export function GoogleLoginBtn() {
  const { signIn } = useAuthActions();

  const { isAuthenticated } = useConvexAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() =>
            void signIn("google", {
              redirectTo: "/dashboard",
            })
          }
          className="cursor-pointer"
          size={"icon"}
        >
          <FaGoogle />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>Sign in with Google</p>
      </TooltipContent>
    </Tooltip>
  );
}

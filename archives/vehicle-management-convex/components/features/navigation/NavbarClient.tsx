"use client";

import { Button } from "@/components/ui/button";

import { useConvexAuth } from "convex/react";
import { ModeToggle } from "@/components/features/toggle-theme";
import Swiggler from "@/components/features/loader/swiggler";
import Link from "next/link";
import UserCard from "./UserCard";

export default function NavbarClient() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex flex-row gap-4 items-center text-sm">
        <Swiggler className="!h-8 !w-8" />
        Loading profile....
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated && (
        <Link href={"/auth/signin"}>
          <Button>Sign In</Button>
        </Link>
      )}
      <UserCard />
      <ModeToggle />
    </>
  );
}

"use client";

import { useAuth } from "@/components/features/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail } from "lucide-react";

export default function UserCard() {
  const { user: loggedInUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const appUser = loggedInUser?.appUser;
  const user = loggedInUser?.user;

  return (
    <div className="flex flex-row items-center gap-2 text-sm">
      {user?.image && (
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>{appUser?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      )}

      <div className="hidden md:flex">
        <HoverCard>
          <HoverCardTrigger>{appUser?.name || user?.name}</HoverCardTrigger>
          <HoverCardContent className="space-y-4">
            <div className="flex flex-row items-center gap-4 text-sm">
              {user?.email && (
                <>
                  <Mail size={20} />
                  {user.email}
                </>
              )}
            </div>
            {user?.phone && <p className="text-sm">{user.phone}</p>}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

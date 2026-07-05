"use client";
import React from "react";

import { LoaderCircle } from "lucide-react";

import Link, { useLinkStatus } from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function LinkTabs({
  tabs,
}: Readonly<{
  tabs: Array<{ id: string; label: string; href: string; icon: React.ElementType }>;
}>) {
  const pathname = usePathname();
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-3">
      <div className="flex flex-row items-center justify-start gap-1 w-max">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "cursor-pointer p-2 rounded-lg text-sm flex items-center gap-2 border border-transparent hover:bg-white/80 hover:dark:bg-black whitespace-nowrap",
              pathname.startsWith(tab.href) &&
                "bg-white border border-gray-400 hover:bg-white dark:bg-secondary hover:dark:bg-secondary",
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <LinkLoader />
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export const LinkLoader = () => {
  const { pending } = useLinkStatus();

  if (!pending) {
    return <div className="w-4 h-4"></div>;
  }

  return <LoaderCircle className="h-4 w-4 text-primary animate-spin" />;
};

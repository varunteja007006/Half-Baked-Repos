"use client";
import React from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { RoleConfig, useRoleConfigs } from "@/hooks/use-role-configs";

import { LinkLoader, LinkTabs } from "@/components/atom/LinkTabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const extractData = (superConfig: RoleConfig) => {
  return {
    title: superConfig.title || "Dashboard",
    description: superConfig.description || "Manage your application settings and preferences.",
    tabs: superConfig.actions.map((action) => ({
      id: action.tabId,
      label: action.label,
      icon: action.icon,
      description: action.description,
      href: action.href,
    })),
  };
};

let timer = null as unknown as NodeJS.Timeout;
const RenderTabsOnMobile = ({
  tabs,
}: Readonly<{
  tabs: Array<{ id: string; label: string; href: string; icon: React.ElementType }>;
}>) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // on mobile whenever pathname changes close the sheet
  React.useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setOpen(false);
    }, 150); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Menu className="mr-1" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="space-y-1 px-2">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "p-2 rounded-sm text-sm flex items-center gap-2 border border-transparent ",
                pathname === tab.href && "bg-primary text-primary-foreground border border-primary",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              <LinkLoader />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const RenderTabs = ({
  tabs,
}: {
  tabs: Array<{
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
  }>;
}) => {
  return (
    <>
      <div className="lg:hidden block">
        <RenderTabsOnMobile tabs={tabs} />
      </div>
      <div className="lg:block hidden">
        <LinkTabs tabs={tabs} />
      </div>
    </>
  );
};

export function SuperAdminTabs() {
  const { availableRoleConfigs, userRoles } = useRoleConfigs();

  if (!userRoles.isSuper) {
    return null;
  }

  const superConfig = availableRoleConfigs.super;

  if (!superConfig) {
    return null;
  }

  const { tabs } = extractData(superConfig);

  return <RenderTabs tabs={tabs} />;
}

export function AdminTabs() {
  const { availableRoleConfigs, userRoles } = useRoleConfigs();

  if (!userRoles.isAdmin) {
    return null;
  }

  const superConfig = availableRoleConfigs.admin;

  if (!superConfig) {
    return null;
  }

  const { tabs } = extractData(superConfig);

  return <RenderTabs tabs={tabs} />;
}

export function DriverTabs() {
  const { availableRoleConfigs, userRoles } = useRoleConfigs();

  if (!userRoles.isDriver) {
    return null;
  }

  const superConfig = availableRoleConfigs.driver;

  if (!superConfig) {
    return null;
  }

  const { tabs } = extractData(superConfig);

  return <RenderTabs tabs={tabs} />;
}

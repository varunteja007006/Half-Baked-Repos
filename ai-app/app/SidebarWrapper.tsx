import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/toggle-theme";

import { BotIcon } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default function SidebarWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <nav className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-4 items-center">
              <SidebarTrigger />
              <BotIcon className="mr-2 size-6" />
            </div>
            <ModeToggle />
          </div>
        </nav>
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}

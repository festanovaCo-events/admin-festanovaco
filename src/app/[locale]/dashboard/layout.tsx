"use client";

import type React from "react";
import { StatusOverlay } from "@/shared/ui/common/status-overlay/status-overlay";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/shadcn/ui/sidebar";
import { AppHeader } from "@/shared/ui/shell/header/app-header";
import { AppSidebar } from "@/shared/ui/shell/sidebar/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger />
            <div className="flex-1">
              <AppHeader />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <StatusOverlay>{children}</StatusOverlay>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

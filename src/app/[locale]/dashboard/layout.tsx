"use client";

import type React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";
import { AppHeader } from "@/components/ui/header/app-header";

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
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

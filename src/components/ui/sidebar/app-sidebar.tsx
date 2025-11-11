"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarMenuBadge,
} from "@/components/shadcn/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible";
import { NAV_SECTIONS } from "@/constants";
import { NavItem } from "@/interfaces";

export const AppSidebar = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const getItemClasses = (active: boolean) =>
    `${active ? "text-[#00A76F]" : "text-[#637381]"} font-medium`;

  const renderItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === `/${locale}${item.href}`;
    const Icon = item.icon;
    const hasChildren = item.children?.length;

    if (hasChildren) {
      return (
        <Collapsible key={item.title} defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className="px-3 py-5 [&[data-active='true']]:bg-[rgba(0,167,111,18%)]"
              >
                {Icon && <Icon className={getItemClasses(isActive)} />}
                <span className={getItemClasses(isActive)}>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children!.map((child) => renderItem(child, depth + 1))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    const Wrapper = depth > 0 ? SidebarMenuSubItem : SidebarMenuItem;
    const Button = depth > 0 ? SidebarMenuSubButton : SidebarMenuButton;

    return (
      <Wrapper key={item.href}>
        <Button
          asChild
          tooltip={item.title}
          isActive={isActive}
          className="px-3 py-5 [&[data-active='true']]:bg-[rgba(0,167,111,18%)]"
        >
          <Link href={item.href ?? "#"}>
            {Icon && <Icon className={getItemClasses(isActive)} />}
            <span className={getItemClasses(isActive)}>{item.title}</span>
            {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
          </Link>
        </Button>
      </Wrapper>
    );
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-400 to-teal-500">
                  <span className="text-lg font-bold text-white">N</span>
                </div>
                <span className="font-semibold group-data-[collapsible=icon]:hidden">
                  Dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-2">
        {NAV_SECTIONS.map(({ label, items }) => (
          <SidebarGroup
            className="group-data-[collapsible=icon]:first-of-type:border-b-2"
            key={label}
          >
            <SidebarGroupLabel className="text-[#919EAB] font-bold group-data-[collapsible=icon]:hidden">
              {label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{items.map((item) => renderItem(item))}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

import { NavSection } from "@/interfaces";
import { CalendarPlus, CircleGauge, MailPlus, TrendingUp, FileSpreadsheet } from "lucide-react";

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      { title: "App", href: "/dashboard", icon: CircleGauge },
      { title: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        title: "Event",
        href: "/dashboard/event",
        icon: CalendarPlus,
        children: [
          { title: "List", href: "/dashboard/event/list" },
          { title: "Create", href: "/dashboard/event/create" },
        ],
      },
      {
        title: "Template email",
        href: "/dashboard/template-email",
        icon: MailPlus,
      },
      {
        title: "File Manager",
        href: "/dashboard/file-manager",
        icon: FileSpreadsheet,
      },
    ],
  },
];

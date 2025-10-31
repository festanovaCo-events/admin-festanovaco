import { NavSection } from "@/interfaces";
import { CircleGauge, Newspaper, TrendingUp, User } from "lucide-react";

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
        title: "User",
        href: "/dashboard/user",
        icon: User,
        children: [
          { title: "Profile", href: "/dashboard/user/profile" },
          { title: "Cards", href: "/dashboard/user/cards" },
          { title: "List", href: "/dashboard/user/list" },
          { title: "Create", href: "/dashboard/user/create" },
          { title: "Edit", href: "/dashboard/user/edit" },
          { title: "Account", href: "/dashboard/user/account" },
        ],
      },
      { title: "Blog", href: "/dashboard/blog", icon: Newspaper },
    ],
  },
];

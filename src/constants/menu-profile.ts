import { DollarSign, Home, Layers, Settings, Shield, User } from "lucide-react";

export const MENU_ITEMS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Layers, label: "Projects", href: "/dashboard/projects", badge: 3 },
  {
    icon: DollarSign,
    label: "Subscription",
    href: "/dashboard/subscription",
  },
  { icon: Shield, label: "Security", href: "/dashboard/security" },
  { icon: Settings, label: "Account settings", href: "/dashboard/settings" },
];

"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { Avatar } from "@/components/common";
import { MENU_ITEMS } from "@/constants";
import { ProfileDrawerProps } from "@/interfaces";
import { logout } from "@/services/auth";

export const SheetProfile: FC<ProfileDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("profile");

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        aria-describedby={"profile user"}
        className="w-full sm:max-w-md"
      >
        <SheetTitle className="sr-only">title goes here</SheetTitle>
        <SheetDescription className="sr-only">
          description goes here
        </SheetDescription>
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center pt-8 pb-6">
            <Avatar
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              fallback="JD"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Jhon Dohn
            </h2>
            <p className="text-sm text-gray-500">demo@minimals.cc</p>

            <div className="flex items-center gap-2 mt-4">
              <Avatar
                className="h-12 w-12"
                src="/man-with-glasses.jpg"
                alt="User 1"
                fallback="U1"
              />

              <Avatar
                className="h-12 w-12"
                src="/woman-with-blonde-hair.jpg"
                alt="User 2"
                fallback="U2"
              />

              <Avatar
                className="h-12 w-12"
                src="/person-with-purple-hair.jpg"
                alt="User 3"
                fallback="U3"
              />

              <Button
                variant="outline"
                size="icon"
              className="h-12 w-12 rounded-full border-2 border-dashed border-gray-300 bg-transparent cursor-pointer"
              >
                <Plus className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-2">
            {MENU_ITEMS.map((item) => {
              const translatedLabel = 
                item.label === "Home" ? t("home") :
                item.label === "Profile" ? t("profile") :
                item.label === "Projects" ? t("projects") :
                item.label === "Subscription" ? t("subscription") :
                item.label === "Security" ? t("security") :
                item.label === "Account settings" ? t("accountSettings") :
                item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5 text-gray-500" />
                  <span className="flex-1 text-sm font-medium">{translatedLabel}</span>
                  {item.badge && (
                    <Badge
                      variant="destructive"
                      className="h-5 min-w-5 rounded-full px-1.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mx-2 mb-4 overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 via-pink-400 to-purple-500 p-6">
            <div className="relative">
              <h3 className="text-2xl font-bold text-white">{t("upgrade.title")}</h3>
              <p className="mt-1 text-sm text-white/90">
                {t("upgrade.subtitle")}
              </p>
              <Button className="mt-4 bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold">
                {t("upgrade.button")}
              </Button>
              <div className="absolute -right-2 -top-2">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full"
                      fill="none"
                    >
                      <path
                        d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
                        fill="rgba(255,255,255,0.2)"
                      />
                      <ellipse
                        cx="50"
                        cy="75"
                        rx="15"
                        ry="8"
                        fill="rgba(255,255,255,0.15)"
                      />
                      <path
                        d="M45 75 Q50 85 55 75"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 pb-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 cursor-pointer"
            >
              {t("logout")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

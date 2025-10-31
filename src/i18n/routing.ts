import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export { routing, Link, redirect, usePathname, useRouter, getPathname };

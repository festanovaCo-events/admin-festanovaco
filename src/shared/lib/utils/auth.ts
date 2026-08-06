import { getAuthToken } from "./cookies";

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return !!token;
}

export function getCurrentLocale(): string {
  if (typeof window === "undefined") {
    return "en";
  }

  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);

  const validLocales = ["en", "es"];
  const localeFromPath = pathSegments[0];

  if (validLocales.includes(localeFromPath)) {
    return localeFromPath;
  }

  const localeFromCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("NEXT_LOCALE="))
    ?.split("=")[1];

  if (localeFromCookie && validLocales.includes(localeFromCookie)) {
    return localeFromCookie;
  }

  return "en";
}

export function isAuthRoute(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const pathname = window.location.pathname;
  return (
    pathname.includes("/auth/login") ||
    pathname.includes("/auth/register") ||
    pathname.includes("/auth/forgot-password")
  );
}

export function redirectToLogin(force: boolean = false): void {
  if (typeof window === "undefined") {
    return;
  }

  if (isAuthRoute()) {
    return;
  }

  if (!force && isAuthenticated()) {
    return;
  }

  const locale = getCurrentLocale();
  window.location.href = `/${locale}/auth/login`;
}

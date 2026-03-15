import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Constante para la clave de la cookie de autenticación
 */
const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Rutas públicas que no requieren autenticación
 */
const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/forgot-password'];

/**
 * Rutas protegidas que requieren autenticación
 */
const PROTECTED_ROUTES = ['/dashboard'];

/**
 * Extrae el locale de la pathname
 */
function getLocaleFromPathname(pathname: string): string {
  const pathSegments = pathname.split('/').filter(Boolean);
  const validLocales = ['en', 'es'];
  const localeFromPath = pathSegments[0];
  
  if (validLocales.includes(localeFromPath)) {
    return localeFromPath;
  }
  
  return 'en';
}

/**
 * Verifica si una ruta es pública
 */
function isPublicRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';
  return PUBLIC_ROUTES.some(route => pathWithoutLocale.startsWith(route));
}

/**
 * Verifica si una ruta está protegida
 */
function isProtectedRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';
  return PROTECTED_ROUTES.some(route => pathWithoutLocale.startsWith(route));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const isAuthenticated = !!authToken;

  if (pathname === "/") {
    const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;
    const acceptLang = request.headers.get("accept-language");
    const browserLang = acceptLang?.split(",")[0].split("-")[0];
    const locale = localeFromCookie || browserLang || "en";

    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  const locale = getLocaleFromPathname(pathname);

  if (isAuthenticated && isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
};

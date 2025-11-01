import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

    const acceptLang = request.headers.get("accept-language");
    const browserLang = acceptLang?.split(",")[0].split("-")[0];

    const locale = localeFromCookie || browserLang || "en";

    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Matcher para rutas que deben ser procesadas por el middleware
  matcher: [
    // Incluir todas las rutas excepto las que empiezan con:
    // - api (API routes)
    // - _next/static (archivos estáticos)
    // - _next/image (optimización de imágenes)
    // - favicon.ico (favicon)
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
};

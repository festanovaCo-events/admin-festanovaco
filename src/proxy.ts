import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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

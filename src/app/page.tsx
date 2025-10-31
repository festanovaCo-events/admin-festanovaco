import { routing } from "@/i18n/routing";
import { redirect } from "next/navigation";

export default function Page() {
  // Toma el idioma por defecto configurado
  const defaultLocale = routing.defaultLocale || "es";

  // Redirige dinámicamente al dashboard con el locale correcto
  redirect(`/${defaultLocale}/dashboard`);
}

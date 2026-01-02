import { useLocale } from "next-intl";
import { formatDate } from "@/lib/utils";

/**
 * Hook personalizado para formatear fechas de eventos
 * Implementa el principio de Single Responsibility y DRY
 * 
 * @param format - Formato de fecha ("short" | "long")
 * @returns Función para formatear fechas
 */
export function useEventDateFormatter(format: "short" | "long" = "short") {
  const locale = useLocale();

  return (dateString: string) => {
    return formatDate(dateString, {
      locale: locale === "en" ? "en-US" : "es-ES",
      format,
    });
  };
}





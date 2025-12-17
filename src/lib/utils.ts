import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Constantes para colores de tipos de evento
 */
const EVENT_TYPE_COLORS: Record<string, string> = {
  boda: "bg-blue-100 text-blue-800",
  cumpleanos: "bg-pink-100 text-pink-800",
  aniversario: "bg-purple-100 text-purple-800",
  graduacion: "bg-green-100 text-green-800",
  corporativo: "bg-gray-100 text-gray-800",
} as const;

const DEFAULT_EVENT_TYPE_COLOR = "bg-gray-100 text-gray-800";

/**
 * Obtiene las clases de color para el tipo de evento
 * @param type - Tipo de evento
 * @returns Clases CSS para el tipo de evento
 */
export function getEventTypeColor(type: string): string {
  return EVENT_TYPE_COLORS[type] || DEFAULT_EVENT_TYPE_COLOR;
}

/**
 * Constantes para opciones de formato de fecha
 */
const DEFAULT_LOCALE = "es-ES";
const DEFAULT_FORMAT = "short";

/**
 * Formatea una fecha a formato legible
 * @param dateString - Fecha en formato string
 * @param options - Opciones de formato
 * @returns Fecha formateada como string
 */
export function formatDate(
  dateString: string,
  options?: {
    locale?: string;
    includeTime?: boolean;
    format?: "short" | "long";
  }
): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return dateString; // Retorna el string original si la fecha es inválida
  }

  const locale = options?.locale || DEFAULT_LOCALE;
  const format = options?.format || DEFAULT_FORMAT;

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: format === "long" ? "long" : "short",
    year: "numeric",
  };

  if (options?.includeTime) {
    dateOptions.hour = "2-digit";
    dateOptions.minute = "2-digit";
  }

  return date.toLocaleDateString(locale, dateOptions);
}

/**
 * Trunca un texto a una longitud máxima
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima (default: 120)
 * @returns Texto truncado con "..." si excede la longitud
 */
export function truncateText(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

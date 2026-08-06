import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  boda: "bg-blue-100 text-blue-800",
  cumpleanos: "bg-pink-100 text-pink-800",
  aniversario: "bg-purple-100 text-purple-800",
  graduacion: "bg-green-100 text-green-800",
  corporativo: "bg-gray-100 text-gray-800",
} as const;

const DEFAULT_EVENT_TYPE_COLOR = "bg-gray-100 text-gray-800";

export function getEventTypeColor(type: string): string {
  return EVENT_TYPE_COLORS[type] || DEFAULT_EVENT_TYPE_COLOR;
}

const DEFAULT_LOCALE = "es-ES";
const DEFAULT_FORMAT = "short";

export function formatDate(
  dateString: string,
  options?: {
    locale?: string;
    includeTime?: boolean;
    format?: "short" | "long";
  },
): string {
  let date: Date;
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (dateOnlyMatch) {
    const [, y, m, d] = dateOnlyMatch;
    date = new Date(Number(y), Number(m) - 1, Number(d));
  } else {
    date = new Date(dateString);
  }

  if (Number.isNaN(date.getTime())) {
    return dateString;
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

export function truncateText(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = Math.round((bytes / k ** i) * 100) / 100;
  return `${value} ${sizes[i]}`;
}

// Date/Time utilities — componentes locales (mismo criterio que en event.adapter)
const pad2 = (n: number) => String(n).padStart(2, "0");

/** YYYY-MM-DD y HH:mm en calendario local a partir de un `Date` válido. */
export function localDateAndTimeFromDate(date: Date): {
  date: string;
  time: string;
} {
  return {
    date: `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`,
    time: `${pad2(date.getHours())}:${pad2(date.getMinutes())}`,
  };
}

/** Igual que arriba, desde un ISO string; vacío si falta o es inválido. */
export function localDateAndTimeFromIsoString(iso: string): {
  date: string;
  time: string;
} {
  if (!iso?.trim()) return { date: "", time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };
  return localDateAndTimeFromDate(d);
}

export function toLocalInputValue(date: Date): string {
  const { date: ymd, time: hm } = localDateAndTimeFromDate(date);
  return `${ymd}T${hm}`;
}

export function toIsoUtcNoMs(d: Date): string {
  const iso = new Date(d).toISOString();
  return iso.replace(".000Z", "Z");
}

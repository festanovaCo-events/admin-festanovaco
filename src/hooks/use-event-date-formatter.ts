import { useLocale } from "next-intl";
import { formatDate } from "@/lib/utils";

export function useEventDateFormatter(format: "short" | "long" = "short") {
  const locale = useLocale();

  return (dateString: string) => {
    return formatDate(dateString, {
      locale: locale === "en" ? "en-US" : "es-ES",
      format,
    });
  };
}

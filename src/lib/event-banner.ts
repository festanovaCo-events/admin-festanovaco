import type { EventAssets } from "@/interfaces";
import { EVENT_TYPE_MAP, EVENT_TYPES } from "@/constants";

/** URLs de respaldo (Unsplash) por tipo canónico de evento */
export const EVENT_FALLBACK_BANNER_BY_TYPE: Record<string, string> = {
  [EVENT_TYPES.WEDDING]:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=80",
  [EVENT_TYPES.BIRTHDAY]:
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=80",
  [EVENT_TYPES.ANNIVERSARY]:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
  [EVENT_TYPES.GRADUATION]:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80",
  [EVENT_TYPES.CORPORATE]:
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80",
};

export function getFallbackEventBannerUrl(eventType: string): string {
  const key = eventType.toLowerCase();
  const canonical = EVENT_TYPE_MAP[key] ?? key;
  return (
    EVENT_FALLBACK_BANNER_BY_TYPE[canonical] ??
    EVENT_FALLBACK_BANNER_BY_TYPE[EVENT_TYPES.WEDDING]
  );
}

/**
 * Si `assets` tiene `bannerPhoto` no vacío, lo devuelve; si no, imagen Unsplash según `eventType`.
 */
export function resolveEventBannerPhoto(
  assets: EventAssets | null | undefined,
  eventType: string,
): string {
  const url = assets?.bannerPhoto?.trim();
  if (url) return url;
  return getFallbackEventBannerUrl(eventType);
}

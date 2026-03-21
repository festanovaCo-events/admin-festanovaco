import { AUDIO_EXTENSIONS } from "@/constants";

export function normalizeMusicUrl(value?: string): string {
  return typeof value === "string" ? value.trim() : "";
}

export function getYoutubeEmbedUrl(urlValue: string): string | null {
  try {
    const parsedUrl = new URL(urlValue);
    const host = parsedUrl.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
    }

    if (host.includes("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/watch")) {
        const videoId = parsedUrl.searchParams.get("v");
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        const videoId = parsedUrl.pathname.split("/embed/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const videoId = parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function isDirectAudioUrl(urlValue: string): boolean {
  try {
    const parsedUrl = new URL(urlValue);
    const pathname = parsedUrl.pathname.toLowerCase();
    return AUDIO_EXTENSIONS.some((extension) => pathname.endsWith(extension));
  } catch {
    return false;
  }
}

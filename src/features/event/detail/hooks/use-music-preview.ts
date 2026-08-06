import { useMemo } from "react";
import {
  getYoutubeEmbedUrl,
  isDirectAudioUrl,
  normalizeMusicUrl,
} from "@/shared/lib/utils/music-preview";

/** Deriva la URL de reproducción/embed de música a partir de la URL cruda del asset del evento. */
export const useMusicPreview = (url?: string) => {
  return useMemo(() => {
    const musicUrl = normalizeMusicUrl(url);
    const youtubeEmbedUrl = getYoutubeEmbedUrl(musicUrl);
    const showAudioPreview = isDirectAudioUrl(musicUrl);

    return {
      musicUrl,
      youtubeEmbedUrl,
      showAudioPreview,
    };
  }, [url]);
};

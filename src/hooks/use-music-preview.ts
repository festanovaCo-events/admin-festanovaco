import { useMemo } from "react";
import {
  getYoutubeEmbedUrl,
  isDirectAudioUrl,
  normalizeMusicUrl,
} from "@/lib/utils/music-preview";

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

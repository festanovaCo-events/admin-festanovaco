"use client";

import { useDetailEffect } from "./effect/use-detail-effect";
import { useDetailHandler } from "./handler/use-detail-handler";
import { useDetailState } from "./state/use-detail-state";

export function useEventDetail() {
  const state = useDetailState();

  const handler = useDetailHandler({
    setIsPreviewOpen: state.setIsPreviewOpen,
    setPreviewSrc: state.setPreviewSrc,
  });

  useDetailEffect({ eventId: state.eventId, execute: state.execute });

  return {
    isLoading: state.isLoading,
    error: state.error,
    event: state.event,
    formatEventDate: state.formatEventDate,
    musicUrl: state.musicUrl,
    youtubeEmbedUrl: state.youtubeEmbedUrl,
    showAudioPreview: state.showAudioPreview,
    isPreviewOpen: state.isPreviewOpen,
    previewSrc: state.previewSrc,
    onPreviewOpenChange: state.setIsPreviewOpen,
    onBack: handler.onBack,
    onSelectPhoto: handler.onSelectPhoto,
  };
}

export type UseEventDetailReturn = ReturnType<typeof useEventDetail>;

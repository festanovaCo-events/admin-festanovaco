"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";
import { useMusicPreview } from "./use-music-preview";

export function useDetailState() {
  const params = useParams();
  const eventId = params.id as string;

  const {
    isLoading,
    error,
    data: event,
    execute,
  } = useAsyncRequest<Event | null>({
    showToast: false,
  });

  const formatEventDate = useEventDateFormatter("long");
  const { musicUrl, youtubeEmbedUrl, showAudioPreview } = useMusicPreview(
    event?.assets?.musicUrl,
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  return {
    eventId,
    isLoading,
    error,
    event,
    execute,
    formatEventDate,
    musicUrl,
    youtubeEmbedUrl,
    showAudioPreview,
    isPreviewOpen,
    setIsPreviewOpen,
    previewSrc,
    setPreviewSrc,
  };
}

export type DetailState = ReturnType<typeof useDetailState>;

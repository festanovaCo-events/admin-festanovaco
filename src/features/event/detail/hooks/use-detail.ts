"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { getEventById } from "@/shared/data/event/get";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";
import { useMusicPreview } from "./use-music-preview";

export function useEventDetail() {
  const router = useRouter();
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

  useEffect(() => {
    void execute(async () => await getEventById(eventId));
  }, [execute, eventId]);

  const onBack = () => {
    router.back();
  };

  const onSelectPhoto = (src: string) => {
    setPreviewSrc(src);
    setIsPreviewOpen(true);
  };

  return {
    isLoading,
    error,
    event,
    formatEventDate,
    musicUrl,
    youtubeEmbedUrl,
    showAudioPreview,
    isPreviewOpen,
    previewSrc,
    onPreviewOpenChange: setIsPreviewOpen,
    onBack,
    onSelectPhoto,
  };
}

export type UseEventDetailReturn = ReturnType<typeof useEventDetail>;

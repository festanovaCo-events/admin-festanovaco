"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Music,
  User,
  Quote,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { GalleryGrid } from "@/components/app/dashboard/event/detail/gallery-grid";
import { PhotoPreviewDialog } from "@/components/app/dashboard/event/detail/photo-preview-dialog";
import { InfoRow, AsyncStateLayout } from "@/components/common";
import { getEventTypeColor } from "@/lib/utils";
import Image from "next/image";
import { getEventById } from "@/services/event";
import type { Event } from "@/interfaces";
import { useAsyncRequest, useEventDateFormatter, useMusicPreview } from "@/hooks";
import { EventDetailSkeleton, EventDetailError } from "@/components/app/dashboard/event/detail";
import { EVENT_TYPES_ES } from "@/constants";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("event.detail");
  const tTypes = useTranslations("event.types");

  const eventId = params.id as string;

  const { isLoading, error, data: event, execute } = useAsyncRequest<Event | null>({
    showToast: false,
  });

  const formatEventDate = useEventDateFormatter("long");
  const { musicUrl, youtubeEmbedUrl, showAudioPreview } = useMusicPreview(event?.musicUrl);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    execute(async () => {
      return await getEventById(eventId);
    });
  }, [execute]);

  return (
    <AsyncStateLayout
      isLoading={isLoading}
      error={error || (!event ? t("notFound") : null)}
      skeleton={<EventDetailSkeleton />}
      errorComponent={<EventDetailError error={error} />}
    >
      {event && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 cursor-pointer"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
              <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
            </div>
          </div>

          {event.bannerPhoto && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={event.bannerPhoto}
                alt={event.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-md ${getEventTypeColor(
                            event.eventType
                          )}`}
                        >
                          {tTypes(event.eventType as any)}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t">
                    <InfoRow
                      icon={<Calendar className="h-5 w-5" />}
                      label={t("eventDate")}
                      value={formatEventDate(event.date)}
                    />
                    <InfoRow
                      icon={<Clock className="h-5 w-5" />}
                      label={t("eventTime")}
                      value={event.time}
                    />
                    <InfoRow
                      icon={<MapPin className="h-5 w-5" />}
                      label={t("eventLocation")}
                      value={event.location}
                    />
                  </div>
                </CardContent>
              </Card>

              {event.eventType === EVENT_TYPES_ES.BODA && event.ceremonyDate && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("ceremony.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <InfoRow
                      icon={<Calendar className="h-5 w-5" />}
                      label={t("ceremony.date")}
                      value={formatEventDate(event.ceremonyDate)}
                    />
                    <InfoRow
                      icon={<Clock className="h-5 w-5" />}
                      label={t("ceremony.time")}
                      value={event.ceremonyTime || ""}
                    />
                    <InfoRow
                      icon={<MapPin className="h-5 w-5" />}
                      label={t("ceremony.location")}
                      value={event.ceremonyLocation || ""}
                    />
                  </CardContent>
                </Card>
              )}

              {event.gallery && event.gallery.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      {t("gallery.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GalleryGrid
                      photos={event.gallery}
                      title={t("gallery.title")}
                      onSelect={(src) => {
                        setPreviewSrc(src);
                        setIsPreviewOpen(true);
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {event.musicUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5" />
                      {t("music.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {youtubeEmbedUrl && (
                      <iframe
                        src={youtubeEmbedUrl}
                        title="YouTube player"
                        className="w-full aspect-video rounded-md border"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    )}

                    {showAudioPreview && (
                      <audio controls className="w-full">
                        <source src={musicUrl} />
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                    )}
                  </CardContent>
                </Card>
              )}

              {(event.husbandName || event.wifeName || event.description || event.location) && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("additional.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {event.husbandName && (
                      <InfoRow
                        icon={<User className="h-5 w-5" />}
                        label={t("additional.husbandName")}
                        value={event.husbandName}
                      />
                    )}
                    {event.wifeName && (
                      <InfoRow
                        icon={<User className="h-5 w-5" />}
                        label={t("additional.wifeName")}
                        value={event.wifeName}
                      />
                    )}
                    {event.description && (
                      <InfoRow
                        icon={<Quote className="h-5 w-5" />}
                        label={t("additional.quote")}
                        value={event.description}
                      />
                    )}
                    {event.location && (
                      <InfoRow
                        icon={<MapPin className="h-5 w-5" />}
                        label={t("additional.partyAddress")}
                        value={event.location}
                      />
                    )}
                  </CardContent>
                </Card>
              )}

              {event.footerPhoto && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("footerPhoto.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden">
                      <Image
                        src={event.footerPhoto}
                        alt={`${event.title} - Pie de foto`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      <PhotoPreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        title={t("gallery.title")}
        src={previewSrc}
      />
    </AsyncStateLayout>
  );
}

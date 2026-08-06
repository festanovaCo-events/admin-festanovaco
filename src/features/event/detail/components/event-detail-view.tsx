"use client";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Image as ImageIcon,
  MapPin,
  Music,
  Quote,
  User,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { EventTypesMessageKey } from "@/constants/event/event-types";
import { resolveEventBannerPhoto } from "@/shared/lib/event-banner";
import {
  getEventTypeColor,
  localDateAndTimeFromIsoString,
} from "@/shared/lib/utils";
import { AsyncStateLayout } from "@/shared/ui/common/layouts/async-state-layout";
import { InfoRow } from "@/shared/ui/common/info-display/info-row";
import { Button } from "@/shared/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";
import type { UseEventDetailReturn } from "../hooks/use-detail";
import { EventDetailError } from "./error-component";
import { GalleryGrid } from "./gallery-grid";
import { PhotoPreviewDialog } from "./photo-preview-dialog";
import { EventDetailSkeleton } from "./skeleton-loader";

export type EventDetailViewProps = UseEventDetailReturn;

export function EventDetailView({
  isLoading,
  error,
  event,
  formatEventDate,
  musicUrl,
  youtubeEmbedUrl,
  showAudioPreview,
  isPreviewOpen,
  previewSrc,
  onPreviewOpenChange,
  onBack,
  onSelectPhoto,
}: EventDetailViewProps) {
  const t = useTranslations("event.detail");
  const tTypes = useTranslations("event.types");

  return (
    <AsyncStateLayout
      isLoading={isLoading}
      error={error || (!event ? t("notFound") : null)}
      skeleton={<EventDetailSkeleton />}
      errorComponent={<EventDetailError error={error} onBack={onBack} />}
    >
      {event && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 cursor-pointer"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
              <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
            </div>
          </div>

          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={resolveEventBannerPhoto(event.assets, event.eventType)}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-md ${getEventTypeColor(
                            event.eventType,
                          )}`}
                        >
                          {tTypes(event.eventType as EventTypesMessageKey)}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {event.additionalInformation?.description}
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
                      value={event.address}
                    />
                  </div>
                </CardContent>
              </Card>

              {event.assets && event.assets.gallery.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      {t("gallery.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GalleryGrid
                      photos={event.assets.gallery}
                      title={t("gallery.title")}
                      onSelect={onSelectPhoto}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {event.assets && (
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

              {event.additionalInformation && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("additional.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {event.additionalInformation.husbandName && (
                      <InfoRow
                        icon={<User className="h-5 w-5" />}
                        label={t("additional.husbandName")}
                        value={event.additionalInformation.husbandName}
                      />
                    )}
                    {event.additionalInformation.wifeName && (
                      <InfoRow
                        icon={<User className="h-5 w-5" />}
                        label={t("additional.wifeName")}
                        value={event.additionalInformation.wifeName}
                      />
                    )}
                    {event.additionalInformation.description && (
                      <InfoRow
                        icon={<Quote className="h-5 w-5" />}
                        label={t("additional.quote")}
                        value={event.additionalInformation.description}
                      />
                    )}
                    {event.additionalInformation.location && (
                      <InfoRow
                        icon={<MapPin className="h-5 w-5" />}
                        label={t("additional.partyAddress")}
                        value={event.additionalInformation.location}
                      />
                    )}
                    {(() => {
                      const { date, time } = localDateAndTimeFromIsoString(
                        event.additionalInformation.startsAt,
                      );
                      return (
                        <>
                          {date && (
                            <InfoRow
                              icon={<Calendar className="h-5 w-5" />}
                              label={t("additional.partyDate")}
                              value={formatEventDate(date)}
                            />
                          )}
                          {time && (
                            <InfoRow
                              icon={<Clock className="h-5 w-5" />}
                              label={t("additional.partyTime")}
                              value={time}
                            />
                          )}
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {event.assets && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("footerPhoto.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden">
                      <Image
                        src={event.assets.footerPhoto}
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
        onOpenChange={onPreviewOpenChange}
        title={t("gallery.title")}
        src={previewSrc}
      />
    </AsyncStateLayout>
  );
}

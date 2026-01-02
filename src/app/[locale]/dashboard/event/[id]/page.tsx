"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Music,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { InfoRow } from "@/components/common";
import { formatDate, getEventTypeColor } from "@/lib/utils";
import Image from "next/image";
import { MOCK_EVENTS_DETAIL } from "@/constants";

// Mock data - Reemplazar con datos reales de la API
const getEventById = (id: string) => {
  return MOCK_EVENTS_DETAIL[id] || null;
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("event.detail");
  const tTypes = useTranslations("event.types");
  const tCommon = useTranslations("common");

  const eventId = params.id as string;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg mb-4">{t("notFound")}</p>
        <Button onClick={() => router.back()}>{tCommon("back")}</Button>
      </div>
    );
  }

  const formatEventDate = (dateString: string) => {
    return formatDate(dateString, { locale: "es-ES", format: "long" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
      </div>

      {/* Banner Photo */}
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

      {/* Event Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
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

          {/* Ceremony Details (only for weddings) */}
          {event.eventType === "boda" && event.ceremonyDate && (
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
                  value={event.ceremonyTime}
                />
                <InfoRow
                  icon={<MapPin className="h-5 w-5" />}
                  label={t("ceremony.location")}
                  value={event.ceremonyLocation}
                />
              </CardContent>
            </Card>
          )}

          {/* Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  {t("gallery.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((photo: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={photo}
                        alt={`${event.title} - Foto ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Music */}
          {event.musicUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  {t("music.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={event.musicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {event.musicUrl}
                </a>
              </CardContent>
            </Card>
          )}

          {/* Footer Photo */}
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
  );
}

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
import { getEventTypeColor } from "@/lib/utils";
import { useEventDateFormatter } from "@/hooks";
import { getEventById } from "@/services/event.service";
import { Event } from "@/interfaces";
import Image from "next/image";

// Interfaz extendida para incluir campos adicionales del detalle
interface EventDetail extends Event {
  ceremonyDate?: string;
  ceremonyTime?: string;
  ceremonyLocation?: string;
  gallery?: string[];
  footerPhoto?: string;
  musicUrl?: string;
}

// Mock data extendido - Reemplazar con datos reales de la API
const getEventDetailById = (id: string): EventDetail | null => {
  const mockEventDetails: Record<string, EventDetail> = {
    "1": {
      id: "1",
      title: "Boda de María y Juan",
      description:
        "Una celebración especial para unir nuestras vidas en matrimonio. Esperamos compartir este momento único con todos nuestros seres queridos. Este será un día lleno de amor, alegría y momentos inolvidables que recordaremos por siempre.",
      eventType: "boda",
      date: "2025-12-17",
      time: "18:00",
      location: "Salón de Eventos El Jardín, Calle Principal 123",
      ceremonyDate: "2025-12-17",
      ceremonyTime: "16:00",
      ceremonyLocation: "Iglesia San Francisco, Avenida Central 456",
      bannerPhoto:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      musicUrl: "https://www.youtube.com/watch?v=example",
      createdAt: "2025-12-01",
    },
    "2": {
      id: "2",
      title: "Cumpleaños de Ana - 30 años",
      description:
        "Celebración de cumpleaños número 30. Una noche llena de música, baile y diversión con todos nuestros amigos y familia.",
      eventType: "cumpleanos",
      date: "2025-12-20",
      time: "20:00",
      location: "Restaurante La Terraza, Avenida Central 456",
      bannerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      musicUrl: "https://www.youtube.com/watch?v=example2",
      createdAt: "2025-11-25",
    },
    "3": {
      id: "3",
      title: "Aniversario de Bodas - 25 años",
      description:
        "Celebrando 25 años de amor y compromiso. Una velada romántica para recordar todos los momentos especiales que hemos compartido.",
      eventType: "aniversario",
      date: "2025-12-25",
      time: "19:00",
      location: "Hotel Grand Palace, Boulevard Norte 789",
      bannerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      musicUrl: "https://www.youtube.com/watch?v=example3",
      createdAt: "2025-11-20",
    },
  };
  return mockEventDetails[id] || null;
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("event.detail");
  const tTypes = useTranslations("event.types");
  const tCommon = useTranslations("common");
  const formatEventDate = useEventDateFormatter("long");

  const eventId = params.id as string;
  const event = getEventDetailById(eventId);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg mb-4">{t("notFound")}</p>
        <Button onClick={() => router.back()}>{tCommon("back")}</Button>
      </div>
    );
  }

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

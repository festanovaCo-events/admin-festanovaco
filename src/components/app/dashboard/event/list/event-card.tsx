"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Calendar, MapPin, Clock, Settings } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { cn, getEventTypeColor } from "@/lib/utils";
import Image from "next/image";
import { EventCardProps } from "@/interfaces";
import { EVENT_TYPE_MAP, EVENT_TYPES } from "@/constants";

export const EventCard: React.FC<EventCardProps> = ({
  event,
  formatDate,
  getEventTypeLabel,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("common.actions");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleClick = () => {
    router.push(`/${locale}/dashboard/event/${event.id}`);
  };

  const getConfigPath = () => {
    const eventType = EVENT_TYPE_MAP[event.eventType.toLowerCase()] || EVENT_TYPES.WEDDING;
    return `/${locale}/dashboard/event/config/${eventType}/${event.id}`;
  };

  const handleConfigClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(getConfigPath());
  };

  const handleConfigMouseEnter = () => {
    router.prefetch(getConfigPath());
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {event.bannerPhoto ? (
          <>
            {!isImageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <Image
              src={event.bannerPhoto}
              alt={event.title}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-500" />
        )}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-md",
              getEventTypeColor(event.eventType)
            )}
          >
            {getEventTypeLabel(event.eventType)}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {truncateDescription(event.description)}
          </p>

          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleConfigClick}
              onMouseEnter={handleConfigMouseEnter}
              className="w-fit cursor-pointer mt-2"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t("config")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

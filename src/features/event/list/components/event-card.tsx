"use client";

import {
  Calendar,
  Clock,
  MoreVertical,
  Settings,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { EventCardProps } from "@/interfaces/components/app/dashboard/event/list/event-card.interface";
import { resolveEventBannerPhoto } from "@/shared/lib/event-banner";
import { cn, getEventTypeColor } from "@/shared/lib/utils";
import { ConfirmDialog } from "@/shared/ui/common/confirm-dialog/confirm-dialog";
import { Button } from "@/shared/ui/shadcn/ui/button";
import { Card, CardContent } from "@/shared/ui/shadcn/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/shadcn/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/shadcn/ui/skeleton";

export const EventCard: React.FC<EventCardProps> = ({
  event,
  formatDate,
  getEventTypeLabel,
  onView,
  onConfig,
  onConfigPrefetch,
  onUploadGuests,
  onViewGuests,
  onDelete,
}) => {
  const t = useTranslations("common.actions");
  const tList = useTranslations("event.list");
  const tGuestList = useTranslations("guestList.card");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClick = () => {
    onView();
  };

  const handleConfigClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfig();
  };

  const handleConfigMouseEnter = () => {
    onConfigPrefetch();
  };

  const handleUploadGuestsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUploadGuests();
  };

  const handleViewGuestsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewGuests();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteOpen(true);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const statusLabel = event.status
    ? event.status.replaceAll("_", " ").toUpperCase()
    : "N/A";

  return (
    <>
      <Card
        className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] overflow-hidden gap-0"
        onClick={handleClick}
      >
        <div className="relative w-full overflow-hidden aspect-square md:aspect-17/6">
          {!isImageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          <Image
            src={resolveEventBannerPhoto(event.assets, event.eventType)}
            alt={event.title}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              isImageLoaded ? "opacity-100" : "opacity-0",
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={handleImageLoad}
          />
          <div className="absolute top-3 left-3 z-10">
            <span
              className={cn(
                "px-2 py-1 text-xs font-medium rounded-md",
                getEventTypeColor(event.eventType),
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
                <p className="text-sm text-gray-500">
                  {formatDate(event.date)}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">
                  {statusLabel}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleConfigClick}
                      onMouseEnter={handleConfigMouseEnter}
                      className="cursor-pointer"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t("config")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleViewGuestsClick}
                      className="cursor-pointer"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {tGuestList("viewGuests")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleUploadGuestsClick}
                      className="cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {tGuestList("uploadGuests")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDeleteClick}
                      className="text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

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
                <Users className="h-4 w-4 text-gray-400" />
                <span className="line-clamp-1">
                  Capacidad: {event.capacity ?? 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={t("delete")}
        description={tList("deleteConfirm")}
        cancelLabel={t("cancel")}
        confirmLabel={t("delete")}
        confirmVariant="destructive"
        cancelVariant="outline"
        onConfirm={async () => {
          await onDelete();
        }}
      />
    </>
  );
};

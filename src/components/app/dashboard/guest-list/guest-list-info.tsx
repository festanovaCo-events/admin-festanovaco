"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { formatDate, getEventTypeColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { GuestList } from "@/interfaces";
import type { GuestListInfoProps } from "@/interfaces/components/app/dashboard/guest-list";

export const GuestListInfo: React.FC<GuestListInfoProps> = ({
  guestList,
  getEventTypeLabel,
}) => {
  const t = useTranslations("guestList.details");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("listInfo")}</CardTitle>
          <Badge
            className={cn(
              "text-sm font-medium",
              getEventTypeColor(guestList.eventType)
            )}
          >
            {getEventTypeLabel(guestList.eventType)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("createdBy")}</p>
            <p className="font-semibold text-gray-900">{guestList.owner}</p>
            <p className="text-sm text-gray-600">{guestList.ownerEmail}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("createdAt")}</p>
            <p className="font-semibold text-gray-900">
              {formatDate(guestList.createdAt, {
                locale: "es-ES",
                format: "long",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t("totalGuests")}</p>
            <p className="text-2xl font-bold text-gray-900">
              {guestList.totalGuests}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


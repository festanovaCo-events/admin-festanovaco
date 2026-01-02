"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Users, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { cn, getEventTypeColor } from "@/lib/utils";
import { GuestListCardProps } from "@/interfaces";

export const GuestListCard: React.FC<GuestListCardProps> = ({
  guestList,
  formatDate,
  getEventTypeLabel,
}) => {
  const router = useRouter();
  const locale = useLocale();
  
  const confirmationRate = guestList.totalGuests > 0 
    ? Math.round((guestList.confirmedGuests / guestList.totalGuests) * 100)
    : 0;

  const handleShowMore = () => {
    router.push(`/${locale}/dashboard/guest-list/${guestList.id}`);
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {guestList.name}
                </h3>
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    getEventTypeColor(guestList.eventType)
                  )}
                >
                  {getEventTypeLabel(guestList.eventType)}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Creado por: {guestList.owner}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-900">
                  {guestList.totalGuests}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmados</p>
                <p className="text-lg font-semibold text-gray-900">
                  {guestList.confirmedGuests}
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tasa de confirmación</span>
              <span className="font-medium text-gray-900">{confirmationRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${confirmationRate}%` }}
              />
            </div>
          </div>

          {/* Date and Action */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(guestList.createdAt)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowMore}
            >
              Ver invitados
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


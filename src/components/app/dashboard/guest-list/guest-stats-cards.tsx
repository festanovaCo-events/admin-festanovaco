"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { useTranslations } from "next-intl";

interface GuestStatsCardsProps {
  totalGuests: number;
  confirmedCount: number;
  pendingCount: number;
}

export const GuestStatsCards: React.FC<GuestStatsCardsProps> = ({
  totalGuests,
  confirmedCount,
  pendingCount,
}) => {
  const t = useTranslations("guestList.details");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t("total")}</p>
              <p className="text-3xl font-bold text-gray-900">{totalGuests}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t("confirmed")}</p>
              <p className="text-3xl font-bold text-green-600">
                {confirmedCount}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t("pending")}</p>
              <p className="text-3xl font-bold text-orange-600">
                {pendingCount}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <XCircle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


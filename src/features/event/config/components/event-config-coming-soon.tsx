"use client";

import { useTranslations } from "next-intl";
import type { EventConfigComingSoonProps } from "@/interfaces/components/app/dashboard/event/config/event-config-coming-soon.interface";
import { Breadcrumb } from "@/shared/ui/common/breadcrumb/breadcrumb";
import { Card } from "@/shared/ui/shadcn/ui/card";

export const EventConfigComingSoon = ({}: EventConfigComingSoonProps) => {
  const tConfig = useTranslations("event.config");

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{tConfig("title")}</h1>
        <Breadcrumb text={tConfig("breadcrumb")} />
      </div>
      <Card className="p-6">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            {tConfig("selectEventType.comingSoon")}
          </p>
        </div>
      </Card>
    </div>
  );
};

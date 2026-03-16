"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Breadcrumb } from "@/components/common";
import type { EventConfigErrorProps } from "@/interfaces/components/app/dashboard/event/config/event-config-error.interface";

export const EventConfigError = ({ error }: EventConfigErrorProps) => {
  const t = useTranslations("event.create");
  const tConfig = useTranslations("event.config");

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{tConfig("title")}</h1>
        <Breadcrumb text={tConfig("breadcrumb")} />
      </div>
      <Card className="p-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">
            {error || t("error.configureFailed")}
          </p>
        </div>
      </Card>
    </div>
  );
};

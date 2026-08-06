"use client";

import { useTranslations } from "next-intl";
import type { EventConfigNotFoundProps } from "@/interfaces/components/app/dashboard/event/config/event-config-not-found.interface";
import { Button } from "@/shared/ui/shadcn/ui/button";

export const EventConfigNotFound = ({ onBack }: EventConfigNotFoundProps) => {
  const t = useTranslations("event.config.notFound");

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <Button
          onClick={onBack}
          variant="link"
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          {t("backToList")}
        </Button>
      </div>
    </div>
  );
};

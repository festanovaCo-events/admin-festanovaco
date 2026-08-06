"use client";

import { useTranslations } from "next-intl";
import type { EventDetailErrorProps } from "@/interfaces/components/app/dashboard/event/detail/error-component.interface";
import { Button } from "@/shared/ui/shadcn/ui/button";

export const EventDetailError = ({ error, onBack }: EventDetailErrorProps) => {
  const t = useTranslations("event.detail");
  const tCommon = useTranslations("common.actions");

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-gray-500 text-lg mb-4">{error || t("notFound")}</p>
      <Button className="cursor-pointer" onClick={onBack}>
        {tCommon("back")}
      </Button>
    </div>
  );
};

"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/ui/button";
import type { EventDetailErrorProps } from "@/interfaces/components/app/dashboard/event/detail";

export const EventDetailError = ({ error }: EventDetailErrorProps) => {
  const router = useRouter();
  const t = useTranslations("event.detail");
  const tCommon = useTranslations("common.actions");

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-gray-500 text-lg mb-4">
        {error || t("notFound")}
      </p>
      <Button className="cursor-pointer" onClick={() => router.back()}>{tCommon("back")}</Button>
    </div>
  );
};

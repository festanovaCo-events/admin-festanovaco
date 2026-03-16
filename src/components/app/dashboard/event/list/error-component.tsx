"use client";

import { useTranslations } from "next-intl";
import type { ErrorComponentProps } from "@/interfaces/components/app/dashboard/event/list";

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  const t = useTranslations("event.list");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-red-500 text-lg">
        {t("errorLoadingEvents")}
      </p>
      {error && <p className="text-gray-400 text-sm mt-2">{error}</p>}
    </div>
  );
};

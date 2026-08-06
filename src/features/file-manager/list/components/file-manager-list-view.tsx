"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/shadcn/ui/button";
import type { UseFileManagerListReturn } from "../hooks/use-list";

export type FileManagerListViewProps = UseFileManagerListReturn;

export function FileManagerListView({
  onGoToEventList,
}: FileManagerListViewProps) {
  const t = useTranslations("fileManager");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
      </div>
      <div className="rounded-lg border border-dashed p-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {t("selectFromEventList")}
        </p>
        <Button className="cursor-pointer" onClick={onGoToEventList}>
          {t("goToEventList")}
        </Button>
      </div>
    </div>
  );
}

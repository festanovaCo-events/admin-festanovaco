"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/ui/button";

export default function FileManagerPage() {
  const t = useTranslations("fileManager");
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
      </div>
      <div className="rounded-lg border border-dashed p-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">{t("selectFromEventList")}</p>
        <Button className="cursor-pointer" onClick={() => router.push(`/${locale}/dashboard/event/list`)}>
          {t("goToEventList")}
        </Button>
      </div>
    </div>
  );
}

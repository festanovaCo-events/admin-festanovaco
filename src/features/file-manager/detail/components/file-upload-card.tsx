"use client";

import { FileSpreadsheet } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import type { FileUploadCardProps } from "@/interfaces/components/app/dashboard/file-manager/interfaces";
import { FileUploadZone } from "@/shared/ui/common/file-upload/file-upload-zone";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";

export const FileUploadCard: FC<FileUploadCardProps> = ({
  onFileUpload,
  isUploading,
  eventId,
}) => {
  const t = useTranslations("fileManager.upload");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {t("eventId", { id: eventId })}
          </p>
          <FileUploadZone
            id="excel-upload"
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            multiple={true}
            icon={<FileSpreadsheet className="h-8 w-8" />}
            label={t("label")}
            description={t("description")}
            formats={t("formats")}
            onChange={onFileUpload}
            disabled={isUploading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

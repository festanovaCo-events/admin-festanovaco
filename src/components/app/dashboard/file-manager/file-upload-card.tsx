"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { FileSpreadsheet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { FileUploadZone } from "@/components/common";
import { FileUploadCardProps } from "@/interfaces";

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


"use client";

import { FileSpreadsheet, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import type { FileListProps } from "@/interfaces/components/app/dashboard/file-manager/interfaces";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";
import { Input } from "@/shared/ui/shadcn/ui/input";
import { FileItem } from "./file-item";

export const FileList: FC<FileListProps> = ({
  files,
  searchQuery,
  onSearchChange,
  onDownload,
  onDelete,
  formatFileSize,
}) => {
  const t = useTranslations("fileManager.files");

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>
            {t("title")} ({filteredFiles.length})
          </CardTitle>
          <div className="relative md:max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredFiles.length > 0 ? (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onDownload={onDownload}
                onDelete={onDelete}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileSpreadsheet className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery ? t("noResults") : t("empty")}
            </p>
            {searchQuery && (
              <p className="text-gray-400 text-sm mt-2">
                {t("noResultsFor")} "{searchQuery}"
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

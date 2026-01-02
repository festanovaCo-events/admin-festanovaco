"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { FileSpreadsheet, Trash2, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { FileItemProps } from "@/interfaces";

export const FileItem: FC<FileItemProps> = ({
  file,
  onDownload,
  onDelete,
  formatFileSize,
}) => {
  const t = useTranslations("fileManager.files");
  const tCommon = useTranslations("common");

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="shrink-0">
          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FileSpreadsheet className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{file.name}</p>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>
              {formatDate(file.uploadedAt, {
                locale: "es-ES",
                format: "short",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDownload(file)}
          title={t("download")}
        >
          <Download className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onDelete(file.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {tCommon("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};


"use client";

import { useTranslations } from "next-intl";
import type { UseFileManagerDetailReturn } from "../hooks/use-detail";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { FileList } from "./file-list";
import { FileUploadCard } from "./file-upload-card";

export type FileManagerDetailViewProps = UseFileManagerDetailReturn;

export function FileManagerDetailView({
  eventId,
  files,
  searchQuery,
  onSearchChange,
  deleteDialogOpen,
  onDeleteDialogChange,
  isUploading,
  onFileUpload,
  onDeleteClick,
  onConfirmDelete,
  onDownload,
  formatFileSize,
}: FileManagerDetailViewProps) {
  const t = useTranslations("fileManager");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
      </div>
      <FileUploadCard
        onFileUpload={onFileUpload}
        isUploading={isUploading}
        eventId={eventId}
      />
      <FileList
        files={files}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onDownload={onDownload}
        onDelete={onDeleteClick}
        formatFileSize={formatFileSize}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogChange}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}

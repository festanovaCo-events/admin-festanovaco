"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { type ChangeEvent, useState } from "react";
import type { UploadInvitationResponse } from "@/interfaces/api/invitation/responses.interface";
import type { ExcelFile } from "@/interfaces/components/app/dashboard/file-manager/interfaces";
import { uploadInvitationFile } from "@/shared/data/invitation/post";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { formatFileSize } from "@/shared/lib/utils";

export function useFileManagerDetail() {
  const params = useParams();
  const eventId = params.id as string;
  const t = useTranslations("fileManager");

  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const { isLoading: isUploading, execute: executeUpload } = useAsyncRequest<
    UploadInvitationResponse[]
  >({
    initialLoading: false,
    successMessage: t("uploadStatus.success"),
    errorMessage: t("uploadStatus.error"),
  });

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const validFiles = Array.from(uploadedFiles).filter((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return extension === "xlsx" || extension === "xls";
    });

    if (validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    void executeUpload(async () => {
      const responses = await Promise.all(
        validFiles.map((file) => uploadInvitationFile(eventId, file)),
      );

      const uploadedAt = new Date().toISOString();
      const newFiles: ExcelFile[] = validFiles.map((file, index) => ({
        id: responses[index].data.id || `${Date.now()}-${Math.random()}`,
        name: responses[index].data.file_name || file.name,
        size: file.size,
        uploadedAt,
        file,
      }));

      setFiles((prev) => [...newFiles, ...prev]);
      return responses;
    });

    e.target.value = "";
  };

  const onDeleteClick = (id: string) => {
    setFileToDelete(id);
    setDeleteDialogOpen(true);
  };

  const onDeleteDialogChange = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setFileToDelete(null);
    }
  };

  const onConfirmDelete = () => {
    if (!fileToDelete) return;
    setFiles((prev) => prev.filter((file) => file.id !== fileToDelete));
    setDeleteDialogOpen(false);
    setFileToDelete(null);
  };

  const onDownload = (file: ExcelFile) => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    eventId,
    files,
    searchQuery,
    onSearchChange: setSearchQuery,
    deleteDialogOpen,
    onDeleteDialogChange,
    isUploading,
    onFileUpload,
    onDeleteClick,
    onConfirmDelete,
    onDownload,
    formatFileSize,
  };
}

export type UseFileManagerDetailReturn = ReturnType<
  typeof useFileManagerDetail
>;

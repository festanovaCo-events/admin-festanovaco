"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { ExcelFile } from "@/interfaces/components/app/dashboard/file-manager/interfaces";
import type { UploadInvitationResponse } from "@/interfaces/api/invitation/responses.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";

export function useDetailState() {
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

  return {
    files,
    setFiles,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    setDeleteDialogOpen,
    fileToDelete,
    setFileToDelete,
    isUploading,
    executeUpload,
  };
}

export type DetailState = ReturnType<typeof useDetailState>;

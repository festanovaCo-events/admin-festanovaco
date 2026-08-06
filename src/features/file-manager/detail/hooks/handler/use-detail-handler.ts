"use client";

import type { ExcelFile } from "@/interfaces/components/app/dashboard/file-manager/interfaces";
import { uploadInvitationFile } from "../data/detail";
import type { DetailState } from "../state/use-detail-state";

type UseDetailHandlerParams = Pick<
  DetailState,
  | "setFiles"
  | "setDeleteDialogOpen"
  | "setFileToDelete"
  | "fileToDelete"
  | "executeUpload"
> & {
  eventId: string;
};

export function useDetailHandler({
  eventId,
  setFiles,
  setDeleteDialogOpen,
  setFileToDelete,
  fileToDelete,
  executeUpload,
}: UseDetailHandlerParams) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    executeUpload(async () => {
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

  const handleDeleteClick = (id: string) => {
    setFileToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setFileToDelete(null);
    }
  };

  const confirmDelete = () => {
    if (!fileToDelete) return;
    setFiles((prev) => prev.filter((file) => file.id !== fileToDelete));
    setDeleteDialogOpen(false);
    setFileToDelete(null);
  };

  const handleDownload = (file: ExcelFile) => {
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
    handleFileUpload,
    handleDeleteClick,
    handleDeleteDialogChange,
    confirmDelete,
    handleDownload,
  };
}

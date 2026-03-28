import { useCallback, useState } from "react";
import { uploadInvitationFile } from "@/services/invitation";
import { useAsyncRequest } from "@/hooks/use-async-request";
import type { ExcelFile, UploadInvitationResponse } from "@/interfaces";
import type {
  UseInvitationUploadOptions,
  UseInvitationUploadReturn,
} from "@/interfaces/hooks";
import { formatFileSize as formatFileSizeUtil } from "@/lib/utils";

export function useInvitationUpload({
  eventId,
  successMessage,
  errorMessage,
}: UseInvitationUploadOptions): UseInvitationUploadReturn {
  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const { isLoading: isUploading, execute: executeUpload } =
    useAsyncRequest<UploadInvitationResponse[]>({
      successMessage,
      errorMessage,
    });

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
          validFiles.map((file) => uploadInvitationFile(eventId, file))
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
    },
    [eventId, executeUpload]
  );

  const handleDeleteClick = useCallback((id: string) => {
    setFileToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteDialogChange = useCallback((open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setFileToDelete(null);
    }
  }, []);

  const confirmDelete = useCallback(() => {
    if (!fileToDelete) return;
    setFiles((prev) => prev.filter((file) => file.id !== fileToDelete));
    setDeleteDialogOpen(false);
    setFileToDelete(null);
  }, [fileToDelete]);

  const handleDownload = useCallback((file: ExcelFile) => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    files,
    searchQuery,
    deleteDialogOpen,
    isUploading,
    handleFileUpload,
    setSearchQuery,
    handleDeleteClick,
    handleDeleteDialogChange,
    confirmDelete,
    handleDownload,
    formatFileSize: formatFileSizeUtil,
  };
}

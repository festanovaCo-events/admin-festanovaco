import type { ChangeEvent } from "react";
import type { ExcelFile } from "@/interfaces";

export interface UseInvitationUploadOptions {
  eventId: string;
  successMessage: string;
  errorMessage: string;
}

export interface UseInvitationUploadReturn {
  files: ExcelFile[];
  searchQuery: string;
  deleteDialogOpen: boolean;
  isUploading: boolean;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchQuery: (value: string) => void;
  handleDeleteClick: (id: string) => void;
  handleDeleteDialogChange: (open: boolean) => void;
  confirmDelete: () => void;
  handleDownload: (file: ExcelFile) => void;
  formatFileSize: (bytes: number) => string;
}

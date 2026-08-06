"use client";

import { useParams } from "next/navigation";
import { formatFileSize } from "./data/detail";
import { useDetailEffect } from "./effect/use-detail-effect";
import { useDetailHandler } from "./handler/use-detail-handler";
import { useDetailState } from "./state/use-detail-state";

export function useFileManagerDetail() {
  const params = useParams();
  const eventId = params.id as string;

  const state = useDetailState();

  const handler = useDetailHandler({
    eventId,
    setFiles: state.setFiles,
    setDeleteDialogOpen: state.setDeleteDialogOpen,
    setFileToDelete: state.setFileToDelete,
    fileToDelete: state.fileToDelete,
    executeUpload: state.executeUpload,
  });

  useDetailEffect();

  return {
    eventId,
    files: state.files,
    searchQuery: state.searchQuery,
    onSearchChange: state.setSearchQuery,
    deleteDialogOpen: state.deleteDialogOpen,
    onDeleteDialogChange: handler.handleDeleteDialogChange,
    isUploading: state.isUploading,
    onFileUpload: handler.handleFileUpload,
    onDeleteClick: handler.handleDeleteClick,
    onConfirmDelete: handler.confirmDelete,
    onDownload: handler.handleDownload,
    formatFileSize,
  };
}

export type UseFileManagerDetailReturn = ReturnType<
  typeof useFileManagerDetail
>;

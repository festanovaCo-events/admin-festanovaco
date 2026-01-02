"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ExcelFile } from "@/interfaces";
import {
  FileUploadCard,
  FileList,
  DeleteConfirmationDialog,
} from "@/components/app/dashboard/file-manager";

export default function FileManagerPage() {
  const t = useTranslations("fileManager");

  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFiles = e.target.files;
      if (!uploadedFiles) return;

      const newFiles: ExcelFile[] = Array.from(uploadedFiles)
        .filter((file) => {
          const extension = file.name.split(".").pop()?.toLowerCase();
          return extension === "xlsx" || extension === "xls";
        })
        .map((file) => ({
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          file,
        }));

      setFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    },
    []
  );

  const handleDeleteClick = (id: string) => {
    setFileToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      setFiles((prev) => prev.filter((file) => file.id !== fileToDelete));
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
      </div>

      {/* Upload Zone */}
      <FileUploadCard onFileUpload={handleFileUpload} />

      {/* Files List */}
      <FileList
        files={files}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDownload={handleDownload}
        onDelete={handleDeleteClick}
        formatFileSize={formatFileSize}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setFileToDelete(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

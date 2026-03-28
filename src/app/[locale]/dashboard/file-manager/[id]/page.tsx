"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useInvitationUpload } from "@/hooks";
import {
    FileUploadCard,
    FileList,
    DeleteConfirmationDialog,
} from "@/components/app/dashboard/file-manager";

export default function FileManagerByEventPage() {
    const params = useParams();
    const t = useTranslations("fileManager");
    const eventId = params.id as string;

    const {
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
        formatFileSize,
    } = useInvitationUpload({
        eventId,
        successMessage: t("uploadStatus.success"),
        errorMessage: t("uploadStatus.error"),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
                    <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
                </div>
            </div>
            <FileUploadCard
                onFileUpload={handleFileUpload}
                isUploading={isUploading}
                eventId={eventId}
            />
            <FileList
                files={files}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onDownload={handleDownload}
                onDelete={handleDeleteClick}
                formatFileSize={formatFileSize}
            />
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={handleDeleteDialogChange}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

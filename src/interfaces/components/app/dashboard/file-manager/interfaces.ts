export interface ExcelFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  file: File;
}

export interface FileUploadCardProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  eventId: string;
}

export interface FileItemProps {
  file: ExcelFile;
  onDownload: (file: ExcelFile) => void;
  onDelete: (id: string) => void;
  formatFileSize: (bytes: number) => string;
}

export interface FileListProps {
  files: ExcelFile[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDownload: (file: ExcelFile) => void;
  onDelete: (id: string) => void;
  formatFileSize: (bytes: number) => string;
}

export interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}


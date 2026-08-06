"use client";

import { FileManagerDetailView } from "@/features/file-manager/detail/components/file-manager-detail-view";
import { useFileManagerDetail } from "@/features/file-manager/detail/hooks/use-detail";

export default function FileManagerByEventPage() {
  const props = useFileManagerDetail();
  return <FileManagerDetailView {...props} />;
}

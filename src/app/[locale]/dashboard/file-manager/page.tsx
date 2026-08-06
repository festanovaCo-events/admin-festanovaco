"use client";

import { FileManagerListView } from "@/features/file-manager/list/components/file-manager-list-view";
import { useFileManagerList } from "@/features/file-manager/list/hooks/use-list";

export default function FileManagerPage() {
  const props = useFileManagerList();
  return <FileManagerListView {...props} />;
}

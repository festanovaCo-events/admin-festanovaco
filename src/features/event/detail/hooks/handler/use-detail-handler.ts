"use client";

import { useRouter } from "next/navigation";
import type { DetailState } from "../state/use-detail-state";

type UseDetailHandlerParams = Pick<
  DetailState,
  "setIsPreviewOpen" | "setPreviewSrc"
>;

export function useDetailHandler({
  setIsPreviewOpen,
  setPreviewSrc,
}: UseDetailHandlerParams) {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  const onSelectPhoto = (src: string) => {
    setPreviewSrc(src);
    setIsPreviewOpen(true);
  };

  return { onBack, onSelectPhoto };
}

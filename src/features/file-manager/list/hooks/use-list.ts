"use client";

import { useListEffect } from "./effect/use-list-effect";
import { useListHandler } from "./handler/use-list-handler";

export function useFileManagerList() {
  const handler = useListHandler();

  useListEffect();

  return {
    onGoToEventList: handler.onGoToEventList,
  };
}

export type UseFileManagerListReturn = ReturnType<typeof useFileManagerList>;

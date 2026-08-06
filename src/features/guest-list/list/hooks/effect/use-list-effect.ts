"use client";

import { useEffect } from "react";
import { getGuestLists } from "../data/list";
import type { ListState } from "../state/use-list-state";

type UseListEffectParams = Pick<ListState, "setGuestLists" | "setIsLoading">;

/** Carga listas de invitados desde la API al montar. */
export function useListEffect({
  setGuestLists,
  setIsLoading,
}: UseListEffectParams) {
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const lists = await getGuestLists();
        if (!cancelled) {
          setGuestLists(lists);
        }
      } catch {
        if (!cancelled) {
          setGuestLists([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [setGuestLists, setIsLoading]);

  return {};
}

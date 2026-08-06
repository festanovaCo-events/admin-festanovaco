"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import type { ListState, SortOption } from "../state/use-list-state";

type UseListHandlerParams = Pick<ListState, "setSearchQuery" | "setSortBy">;

export function useListHandler({
  setSearchQuery,
  setSortBy,
}: UseListHandlerParams) {
  const router = useRouter();
  const locale = useLocale();

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const onSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const onViewGuests = (guestListId: string) => {
    router.push(`/${locale}/dashboard/guest-list/${guestListId}`);
  };

  return {
    onSearchChange,
    onSortChange,
    onViewGuests,
  };
}

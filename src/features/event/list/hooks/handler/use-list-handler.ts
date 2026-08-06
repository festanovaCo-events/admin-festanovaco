"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { EVENT_TYPE_MAP, EVENT_TYPES } from "@/constants/event/event-types";
import type { Event, SortOption } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { deleteEvent } from "../data/list";
import type { ListState } from "../state/use-list-state";

type UseListHandlerParams = Pick<
  ListState,
  "setSearchQuery" | "setSortBy" | "setIsSearchFocused" | "setEvents"
>;

export function useListHandler({
  setSearchQuery,
  setSortBy,
  setIsSearchFocused,
  setEvents,
}: UseListHandlerParams) {
  const router = useRouter();
  const locale = useLocale();
  const tList = useTranslations("event.list");

  const { isLoading: isDeleting, execute: executeDelete } = useAsyncRequest({
    successMessage: tList("deleteSuccess"),
    errorMessage: tList("deleteFailed"),
    initialLoading: false,
  });

  const getConfigPath = (event: Event) => {
    const eventType =
      EVENT_TYPE_MAP[event.eventType.toLowerCase()] || EVENT_TYPES.WEDDING;
    return `/${locale}/dashboard/event/config/${eventType}/${event.id}`;
  };

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const onSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const onSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const onSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const onView = (event: Event) => {
    router.push(`/${locale}/dashboard/event/${event.id}`);
  };

  const onConfig = (event: Event) => {
    router.push(getConfigPath(event));
  };

  const onConfigPrefetch = (event: Event) => {
    router.prefetch(getConfigPath(event));
  };

  const onUploadGuests = (event: Event) => {
    router.push(`/${locale}/dashboard/file-manager/${event.id}`);
  };

  const onViewGuests = (event: Event) => {
    router.push(`/${locale}/dashboard/guest-list/${event.id}`);
  };

  const onDelete = async (event: Event) => {
    await executeDelete(async () => {
      const res = await deleteEvent(event.id);
      router.refresh();
      return res;
    });
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
  };

  return {
    isDeleting,
    onSearchChange,
    onSortChange,
    onSearchFocus,
    onSearchBlur,
    onView,
    onConfig,
    onConfigPrefetch,
    onUploadGuests,
    onViewGuests,
    onDelete,
  };
}

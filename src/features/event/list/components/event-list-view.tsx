"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EventTypesMessageKey } from "@/constants/event/event-types";
import type { SortOption } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { AsyncStateLayout } from "@/shared/ui/common/layouts/async-state-layout";
import { SortSelect } from "@/shared/ui/common/sort-select/sort-select";
import { Input } from "@/shared/ui/shadcn/ui/input";
import type { UseEventListReturn } from "../hooks/use-list";
import { ErrorComponent } from "./error-component";
import { EventCard } from "./event-card";
import { SkeletonLoader } from "./skeleton-loader";

export type EventListViewProps = UseEventListReturn;

export function EventListView({
  events,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  isSearchFocused,
  onSearchFocus,
  onSearchBlur,
  filteredAndSortedEvents,
  formatEventDate,
  isLoading,
  error,
  onView,
  onConfig,
  onConfigPrefetch,
  onUploadGuests,
  onViewGuests,
  onDelete,
}: EventListViewProps) {
  const t = useTranslations("event.list");
  const tTypes = useTranslations("event.types");

  const hasResults = filteredAndSortedEvents.length > 0;
  const hasNoEvents = events.length === 0;
  const isSearching = searchQuery.trim().length > 0 && isSearchFocused;

  const renderEventList = () => {
    if (hasResults) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              formatDate={formatEventDate}
              getEventTypeLabel={(type) => tTypes(type as EventTypesMessageKey)}
              onView={() => onView(event)}
              onConfig={() => onConfig(event)}
              onConfigPrefetch={() => onConfigPrefetch(event)}
              onUploadGuests={() => onUploadGuests(event)}
              onViewGuests={() => onViewGuests(event)}
              onDelete={() => onDelete(event)}
            />
          ))}
        </div>
      );
    }

    if (hasNoEvents && !isSearching) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-gray-500 text-lg">{t("noEvents")}</p>
        </div>
      );
    }

    if (!hasResults && isSearching) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-gray-500 text-lg">{t("noEvents")}</p>
          <p className="text-gray-400 text-sm mt-2">
            {t("noResultsFor")} "{searchQuery}"
          </p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
        <div className="flex items-center gap-4">
          <SortSelect
            value={sortBy}
            onValueChange={(value) => onSortChange(value as SortOption)}
            options={[
              { value: "latest", label: t("sortOptions.latest") },
              { value: "oldest", label: t("sortOptions.oldest") },
              { value: "title", label: t("sortOptions.title") },
            ]}
            placeholder={t("sortBy")}
          />
        </div>
      </div>

      <div className="relative md:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          className="pl-10"
        />
      </div>

      <AsyncStateLayout
        isLoading={isLoading}
        error={error}
        skeleton={<SkeletonLoader />}
        errorComponent={<ErrorComponent error={error} />}
      >
        {renderEventList()}
      </AsyncStateLayout>
    </div>
  );
}

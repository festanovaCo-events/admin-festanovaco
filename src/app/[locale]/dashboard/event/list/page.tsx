"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import { EventCard } from "@/components/app/dashboard/event/list/event-card";
import { SkeletonLoader } from "@/components/app/dashboard/event/list/skeleton-loader";
import { ErrorComponent } from "@/components/app/dashboard/event/list/error-component";
import { SortOption } from "@/interfaces";
import { listEvents } from "@/services/event";
import { useAsyncRequest, useEventDateFormatter } from "@/hooks";
import { useEventFilter } from "@/hooks/use-event-filter";
import { AsyncStateLayout, SortSelect } from "@/components/common";

export default function EventListPage() {
  const t = useTranslations("event.list");
  const tTypes = useTranslations("event.types");

  const {
    events,
    setEvents,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredAndSortedEvents,
  } = useEventFilter();

  const { isLoading, error, execute } = useAsyncRequest({
    showToast: false,
  });

  const formatEventDate = useEventDateFormatter("short");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    execute(async () => {
      const events = await listEvents();
      setEvents(events);
      return { success: true, data: events };
    });
  }, [execute, setEvents]);

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
              getEventTypeLabel={(type) => tTypes(type as any)}
              onDeleted={(id) => {
                setEvents((prev) => prev.filter((e) => e.id === id ? false : true));
              }}
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
            onValueChange={(value) => setSortBy(value as SortOption)}
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
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
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

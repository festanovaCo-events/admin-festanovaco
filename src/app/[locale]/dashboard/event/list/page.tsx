"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { EventCard } from "@/components/app/dashboard/event/list/event-card";
import { useEventFilter } from "@/hooks";
import { getAllEvents } from "@/services/event.service";
import { SortOption } from "@/interfaces";

export default function EventListPage() {
  const t = useTranslations("event.list");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const events = getAllEvents();
  const filteredAndSortedEvents = useEventFilter(events, searchQuery, sortBy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("breadcrumb")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-[140px] gap-3">
              <div className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4 shrink-0" />
                <SelectValue placeholder={t("sortBy")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">{t("sortOptions.latest")}</SelectItem>
              <SelectItem value="oldest">{t("sortOptions.oldest")}</SelectItem>
              <SelectItem value="title">{t("sortOptions.title")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search */}
      <div className="relative md:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Events Grid */}
      {filteredAndSortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-gray-500 text-lg">{t("noEvents")}</p>
          {searchQuery && (
            <p className="text-gray-400 text-sm mt-2">
              {t("noResultsFor")} "{searchQuery}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

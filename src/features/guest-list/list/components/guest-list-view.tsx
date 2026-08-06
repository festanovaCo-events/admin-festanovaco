"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EventTypesMessageKey } from "@/constants/event/event-types";
import { Input } from "@/shared/ui/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/ui/select";
import type { SortOption } from "../hooks/state/use-list-state";
import type { UseGuestListReturn } from "../hooks/use-list";
import { GuestListCard } from "./guest-list-card";

export type GuestListViewProps = UseGuestListReturn;

export function GuestListView({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onViewGuests,
  formatListDate,
  guestLists,
}: GuestListViewProps) {
  const t = useTranslations("guestList");
  const tTypes = useTranslations("event.types");

  const getEventTypeLabel = (type: string) => {
    return tTypes(type as EventTypesMessageKey);
  };

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
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            <SelectTrigger className="w-[140px] cursor-pointer">
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest" className="cursor-pointer">
                {t("sortOptions.latest")}
              </SelectItem>
              <SelectItem value="oldest" className="cursor-pointer">
                {t("sortOptions.oldest")}
              </SelectItem>
              <SelectItem value="name" className="cursor-pointer">
                {t("sortOptions.name")}
              </SelectItem>
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
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Guest Lists Grid */}
      {guestLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guestLists.map((list) => (
            <GuestListCard
              key={list.id}
              guestList={list}
              formatDate={formatListDate}
              getEventTypeLabel={getEventTypeLabel}
              onViewGuests={onViewGuests}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-gray-500 text-lg">{t("noLists")}</p>
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

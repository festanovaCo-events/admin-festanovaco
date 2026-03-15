"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { GuestListCard } from "@/components/app/dashboard/guest-list";
import { formatDate } from "@/lib/utils";
import { MOCK_GUEST_LISTS } from "@/constants/guest-list-mocks";

export default function GuestListPage() {
  const t = useTranslations("guestList");
  const tTypes = useTranslations("event.types");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "name">("latest");

  const filteredAndSortedLists = useMemo(() => {
    let filtered = MOCK_GUEST_LISTS;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (list) =>
          list.name.toLowerCase().includes(query) ||
          list.owner.toLowerCase().includes(query) ||
          list.ownerEmail.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy]);

  const formatListDate = (dateString: string) => {
    return formatDate(dateString, { locale: "es-ES", format: "short" });
  };

  const getEventTypeLabel = (type: string) => {
    return tTypes(type as any);
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
            onValueChange={(value) =>
              setSortBy(value as "latest" | "oldest" | "name")
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">{t("sortOptions.latest")}</SelectItem>
              <SelectItem value="oldest">{t("sortOptions.oldest")}</SelectItem>
              <SelectItem value="name">{t("sortOptions.name")}</SelectItem>
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

      {/* Guest Lists Grid */}
      {filteredAndSortedLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedLists.map((list) => (
            <GuestListCard
              key={list.id}
              guestList={list}
              formatDate={formatListDate}
              getEventTypeLabel={getEventTypeLabel}
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


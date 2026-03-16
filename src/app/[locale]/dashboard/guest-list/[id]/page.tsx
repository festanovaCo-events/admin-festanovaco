"use client";

import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { MOCK_GUEST_LISTS } from "@/constants/guest-list-mocks";
import {
  GuestStatsCards,
  GuestListInfo,
  GuestSearchAndFilters,
  GuestTable,
  GuestPagination,
} from "@/components/app/dashboard/guest-list";
import { useGuestFilter, usePagination } from "@/hooks";

const getGuestListById = (id: string) => {
  return MOCK_GUEST_LISTS.find((list) => list.id === id) || null;
};

export default function GuestListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("guestList.details");
  const tTable = useTranslations("guestList.details.table");
  const tTypes = useTranslations("event.types");
  const tCommon = useTranslations("common.actions");
  const tPage = useTranslations("guestList");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "pending"
  >("all");
  const [expandedGuests, setExpandedGuests] = useState<Set<string>>(new Set());
  const itemsPerPage = 10;

  const guestListId = params.id as string;
  const guestList = getGuestListById(guestListId);

  if (!guestList) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg mb-4">
          Lista de invitados no encontrada
        </p>
        <Button onClick={() => router.push(`/${locale}/dashboard/guest-list`)}>
          {tCommon("back")}
        </Button>
      </div>
    );
  }

  const { filteredGuests } = useGuestFilter({
    guests: guestList.guests,
    searchQuery,
    statusFilter,
  });

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination({
      totalItems: filteredGuests.length,
      itemsPerPage,
      resetDependencies: [searchQuery, statusFilter],
    });

  const paginatedGuests = filteredGuests.slice(startIndex, endIndex);

  const confirmedCount = guestList.guests.filter((g) => g.confirmed).length;
  const pendingCount = guestList.guests.filter((g) => !g.confirmed).length;

  const toggleGuestExpansion = (guestId: string) => {
    setExpandedGuests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(guestId)) {
        newSet.delete(guestId);
      } else {
        newSet.add(guestId);
      }
      return newSet;
    });
  };

  const getEventTypeLabel = (type: string) => {
    return tTypes(type as any);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/${locale}/dashboard/guest-list`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{guestList.name}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {t("breadcrumb")} {">"} {t("title")}
          </p>
        </div>
      </div>

      {/* Info Card */}
      <GuestListInfo
        guestList={guestList}
        getEventTypeLabel={getEventTypeLabel}
      />

      {/* Stats Summary */}
      <GuestStatsCards
        totalGuests={guestList.totalGuests}
        confirmedCount={confirmedCount}
        pendingCount={pendingCount}
      />

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <GuestSearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalCount={guestList.guests.length}
            confirmedCount={confirmedCount}
            pendingCount={pendingCount}
          />

          {/* Table */}
          <GuestTable
            guests={paginatedGuests}
            expandedGuests={expandedGuests}
            onToggleGuestExpansion={toggleGuestExpansion}
            searchQuery={searchQuery}
          />

          {/* Pagination */}
          <GuestPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredGuests.length}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}

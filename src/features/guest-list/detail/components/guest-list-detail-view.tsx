"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EventTypesMessageKey } from "@/constants/event/event-types";
import { AsyncStateLayout } from "@/shared/ui/common/layouts/async-state-layout";
import { Button } from "@/shared/ui/shadcn/ui/button";
import { Card, CardContent } from "@/shared/ui/shadcn/ui/card";
import type { UseGuestListDetailReturn } from "../hooks/use-detail";
import { GuestListInfo } from "./guest-list-info";
import { GuestListInfoSkeleton } from "./guest-list-info.skeleton";
import { GuestPagination } from "./guest-pagination";
import { GuestPaginationSkeleton } from "./guest-pagination.skeleton";
import { GuestSearchAndFilters } from "./guest-search-and-filters";
import { GuestSearchAndFiltersSkeleton } from "./guest-search-and-filters.skeleton";
import { GuestStatsCards } from "./guest-stats-cards";
import { GuestStatsCardsSkeleton } from "./guest-stats-cards.skeleton";
import { GuestTable } from "./guest-table";
import { GuestTableSkeleton } from "./guest-table.skeleton";

export type GuestListDetailViewProps = UseGuestListDetailReturn;

export function GuestListDetailView({
  isLoadingCombined,
  guestList,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  expandedGuests,
  expandedGuestData,
  loadingGuestIds,
  onToggleGuestExpansion,
  onCopyInvitationUrl,
  onBack,
  filteredGuests,
  paginatedGuests,
  pagination,
  itemsPerPage,
  counts,
}: GuestListDetailViewProps) {
  const t = useTranslations("guestList.details");
  const tTypes = useTranslations("event.types");

  const getEventTypeLabel = (type: string) => {
    return tTypes(type as EventTypesMessageKey);
  };

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    pagination;
  const { confirmedCount, pendingCount, declinedCount } = counts;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          {isLoadingCombined ? (
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">
              {guestList?.name ?? "N/A"}
            </h1>
          )}
          <p className="text-sm text-gray-600 mt-1">
            {t("breadcrumb")} {">"} {t("title")}
          </p>
        </div>
      </div>

      <AsyncStateLayout
        isLoading={isLoadingCombined}
        error={null}
        skeleton={<GuestListInfoSkeleton />}
        errorComponent={<div />}
      >
        {guestList && (
          <GuestListInfo
            guestList={guestList}
            getEventTypeLabel={getEventTypeLabel}
          />
        )}
      </AsyncStateLayout>

      <AsyncStateLayout
        isLoading={isLoadingCombined}
        error={null}
        skeleton={<GuestStatsCardsSkeleton />}
        errorComponent={<div />}
      >
        <GuestStatsCards
          totalGuests={guestList?.totalGuests ?? 0}
          confirmedCount={confirmedCount}
          pendingCount={pendingCount}
        />
      </AsyncStateLayout>

      <Card>
        <CardContent className="p-6">
          <AsyncStateLayout
            isLoading={isLoadingCombined}
            error={null}
            skeleton={<GuestSearchAndFiltersSkeleton />}
            errorComponent={<div />}
          >
            <GuestSearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              totalCount={guestList?.guests.length ?? 0}
              confirmedCount={confirmedCount}
              pendingCount={pendingCount}
              declinedCount={declinedCount}
            />
          </AsyncStateLayout>

          <AsyncStateLayout
            isLoading={isLoadingCombined}
            error={null}
            skeleton={<GuestTableSkeleton />}
            errorComponent={<div />}
          >
            <GuestTable
              guests={paginatedGuests}
              expandedGuests={expandedGuests}
              expandedGuestData={expandedGuestData}
              loadingGuestIds={loadingGuestIds}
              onToggleGuestExpansion={onToggleGuestExpansion}
              onCopyInvitationUrl={onCopyInvitationUrl}
              searchQuery={searchQuery}
            />
          </AsyncStateLayout>

          <AsyncStateLayout
            isLoading={isLoadingCombined}
            error={null}
            skeleton={<GuestPaginationSkeleton />}
            errorComponent={<div />}
          >
            <GuestPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredGuests.length}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={handlePageChange}
            />
          </AsyncStateLayout>
        </CardContent>
      </Card>
    </div>
  );
}

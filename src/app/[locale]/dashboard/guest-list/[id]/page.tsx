"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import {
  GuestStatsCards,
  GuestListInfo,
  GuestListInfoSkeleton,
  GuestSearchAndFilters,
  GuestSearchAndFiltersSkeleton,
  GuestTable,
  GuestTableSkeleton,
  GuestPagination,
  GuestPaginationSkeleton,
  GuestStatsCardsSkeleton,
} from "@/components/app/dashboard/guest-list";
import { useGuestListDetail } from "@/hooks/pages/useGuestListDetail";
import { AsyncStateLayout } from "@/components/common/layouts/async-state-layout";

export default function GuestListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("guestList.details");
  const tTypes = useTranslations("event.types");

  const eventId = params.id as string;
  const itemsPerPage = 10;

  const {
    isLoadingCombined,
    guestList,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    expandedGuests,
    toggleGuestExpansion,
    filteredGuests,
    paginatedGuests,
    pagination: {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      handlePageChange,
    },
    counts: {
      confirmedCount,
      pendingCount,
      declinedCount,
    },
  } = useGuestListDetail(eventId, itemsPerPage);

  const getEventTypeLabel = (type: string) => {
    return tTypes(type as any);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          {isLoadingCombined ? (
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{guestList?.name ?? "N/A"}</h1>
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
              onToggleGuestExpansion={toggleGuestExpansion}
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

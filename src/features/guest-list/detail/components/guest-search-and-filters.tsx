"use client";

import { Download, Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import type {
  Guest,
  GuestSearchAndFiltersProps,
} from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { enrichGuestsWithTotalSeats } from "@/shared/data/invitation/get";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import {
  buildGuestListCsvFilename,
  downloadGuestsCsv,
} from "@/shared/lib/download-csv";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/ui/button";
import { Input } from "@/shared/ui/shadcn/ui/input";

export const GuestSearchAndFilters: React.FC<GuestSearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  confirmedCount,
  pendingCount,
  declinedCount,
  guests,
  listName,
}) => {
  const t = useTranslations("guestList.details");
  const { isLoading: isExporting, execute: executeExport } = useAsyncRequest<
    Guest[]
  >({
    showToast: true,
    successMessage: t("downloadCsvSuccess"),
    errorMessage: t("downloadCsvError"),
    initialLoading: false,
  });

  const handleDownloadCsv = () => {
    executeExport(async () => {
      const guestsWithSeats = await enrichGuestsWithTotalSeats(guests);
      downloadGuestsCsv(
        guestsWithSeats,
        buildGuestListCsvFilename(listName ?? "invitados"),
        {
          name: t("table.name"),
          seats: t("table.numberOfSeats"),
          invitationUrl: t("table.invitationUrl"),
        },
      );
      return guestsWithSeats;
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleDownloadCsv}
          disabled={guests.length === 0 || isExporting}
          className="cursor-pointer gap-2 shrink-0"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isExporting ? t("downloadCsvLoading") : t("downloadCsv")}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("all")}
          className={cn(
            "cursor-pointer",
            statusFilter === "all" && "bg-gray-900 text-white",
          )}
        >
          {t("all")} ({totalCount})
        </Button>
        <Button
          variant={statusFilter === "confirmed" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("confirmed")}
          className={cn(
            "cursor-pointer",
            statusFilter === "confirmed" &&
              "bg-green-600 text-white hover:bg-green-700",
          )}
        >
          {t("confirmed")} ({confirmedCount})
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("pending")}
          className={cn(
            "cursor-pointer",
            statusFilter === "pending" &&
              "bg-orange-600 text-white hover:bg-orange-700",
          )}
        >
          {t("pending")} ({pendingCount})
        </Button>
        <Button
          variant={statusFilter === "declined" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("declined")}
          className={cn(
            "cursor-pointer",
            statusFilter === "declined" &&
              "bg-red-600 text-white hover:bg-red-700",
          )}
        >
          {t("table.declinedStatus")} ({declinedCount ?? 0})
        </Button>
      </div>
    </div>
  );
};

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { GuestPaginationProps } from "@/interfaces/components/app/dashboard/guest-list";

export const GuestPagination: React.FC<GuestPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  startIndex,
  endIndex,
  onPageChange,
}) => {
  const t = useTranslations("guestList.details");
  const tCommon = useTranslations("common.actions");

  if (totalItems <= itemsPerPage) {
    return (
      <div className="mt-4 text-sm text-gray-500">
        {t("showing")} {totalItems} {t("of")} {totalItems} {t("guests")}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-500">
        {t("showing")} {startIndex + 1} - {Math.min(endIndex, totalItems)}{" "}
        {t("of")} {totalItems} {t("guests")}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          {tCommon("previous")}
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={cn(
                    "min-w-[40px] cursor-pointer",
                    currentPage === page && "bg-gray-900 text-white"
                  )}
                >
                  {page}
                </Button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1 cursor-pointer"
        >
          {tCommon("next")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};


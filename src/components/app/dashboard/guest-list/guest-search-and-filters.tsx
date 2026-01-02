"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface GuestSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "all" | "confirmed" | "pending";
  onStatusFilterChange: (filter: "all" | "confirmed" | "pending") => void;
  totalCount: number;
  confirmedCount: number;
  pendingCount: number;
}

export const GuestSearchAndFilters: React.FC<GuestSearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  confirmedCount,
  pendingCount,
}) => {
  const t = useTranslations("guestList.details");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
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
      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("all")}
          className={cn(statusFilter === "all" && "bg-gray-900 text-white")}
        >
          {t("all")} ({totalCount})
        </Button>
        <Button
          variant={statusFilter === "confirmed" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("confirmed")}
          className={cn(
            statusFilter === "confirmed" && "bg-green-600 text-white hover:bg-green-700"
          )}
        >
          {t("confirmed")} ({confirmedCount})
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("pending")}
          className={cn(
            statusFilter === "pending" && "bg-orange-600 text-white hover:bg-orange-700"
          )}
        >
          {t("pending")} ({pendingCount})
        </Button>
      </div>
    </div>
  );
};


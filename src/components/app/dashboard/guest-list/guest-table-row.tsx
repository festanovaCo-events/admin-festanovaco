"use client";

import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Guest } from "@/interfaces";
import { SubGuestsRow } from "./sub-guests-row";
import type { GuestTableRowProps } from "@/interfaces/components/app/dashboard/guest-list";

export const GuestTableRow: React.FC<GuestTableRowProps> = ({
  guest,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  const tTable = useTranslations("guestList.details.table");

  return (
    <Fragment>
      <tr
        className={cn(
          "hover:bg-gray-50 transition-colors",
          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
        )}
      >
        <td className="py-4 px-6">
          <span className="font-medium text-gray-900">{guest.name}</span>
        </td>
        <td className="py-4 px-6">
          <span className="text-gray-600 text-sm">{guest.email}</span>
        </td>
        <td className="py-4 px-6">
          <span className="text-gray-600 text-sm">{guest.phone || "-"}</span>
        </td>
        <td className="py-4 px-6 text-center">
          <Badge
            className={cn(
              "text-xs font-medium px-2 py-1",
              guest.confirmed
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-orange-100 text-orange-800 border border-orange-200"
            )}
          >
            {guest.confirmed
              ? tTable("confirmedStatus")
              : tTable("pendingStatus")}
          </Badge>
        </td>
        <td className="py-4 px-6">
          <span className="text-gray-600 text-sm">
            {guest.confirmedAt
              ? formatDate(guest.confirmedAt, {
                  locale: "es-ES",
                  format: "short",
                })
              : "-"}
          </span>
        </td>
        <td className="py-4 px-6 text-center">
          <Badge className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-medium px-2 py-1">
            {guest.numberOfSeats}{" "}
            {guest.numberOfSeats === 1 ? tTable("seat") : tTable("seats")}
          </Badge>
        </td>
        <td className="py-4 px-6 text-center">
          {guest.subGuests && guest.subGuests.length > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="gap-1 text-xs"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
              {guest.subGuests.length} {tTable("subGuests")}
            </Button>
          ) : (
            <span className="text-gray-400 text-sm">-</span>
          )}
        </td>
      </tr>
      {guest.subGuests &&
        guest.subGuests.length > 0 &&
        isExpanded && (
          <SubGuestsRow subGuests={guest.subGuests} />
        )}
    </Fragment>
  );
};


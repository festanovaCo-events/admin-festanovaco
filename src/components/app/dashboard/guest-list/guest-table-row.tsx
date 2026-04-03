"use client";

import { Fragment } from "react";
import { ChevronDown, Users, CheckCircle2, CalendarClock } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Guest } from "@/interfaces";
import { SubGuestsRow } from "./sub-guests-row";
import type { GuestTableRowProps } from "@/interfaces/components/app/dashboard/guest-list";
import { getInvitationInfoByToken } from "@/services/invitation";
import { useAsyncRequest } from "@/hooks";
import { mapInvitationInfoToAugment } from "@/adapters/invitation-info.adapter";

export const GuestTableRow: React.FC<GuestTableRowProps> = ({
  guest,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  const tTable = useTranslations("guestList.details.table");
  const { isLoading, data, execute } = useAsyncRequest<any>({ showToast: false });

  const handleToggle = async () => {
    if (!isExpanded && guest.invitationToken && !data) {
      await execute(async () => {
        const info = await getInvitationInfoByToken(guest.invitationToken!);
        return mapInvitationInfoToAugment(info);
      });
    }
    onToggleExpand();
  };

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
          <span className="text-gray-600 text-sm">{guest.email || "N/A"}</span>
        </td>
        <td className="py-4 px-6">
          <span className="text-gray-600 text-sm">{guest.phone || "N/A"}</span>
        </td>
        <td className="py-4 px-6 text-center">
          <Badge
            className={cn(
              "text-xs font-medium px-2 py-1",
              guest.status === "ACCEPTED"
                ? "bg-green-100 text-green-800 border border-green-200"
                : guest.status === "DECLINED"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-orange-100 text-orange-800 border border-orange-200"
            )}
          >
            {guest.status === "ACCEPTED"
              ? tTable("confirmedStatus")
              : guest.status === "DECLINED"
                ? tTable("declinedStatus")
                : tTable("pendingStatus")}
          </Badge>
        </td>
        <td className="py-4 px-6 text-center">
          {guest.invitationToken ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
            className="gap-1 text-xs cursor-pointer"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
              {isExpanded ? tTable("hideDetails") : tTable("showMoreDetails")}
            </Button>
          ) : (
            <span className="text-gray-400 text-sm">N/A</span>
          )}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50/60">
          <td colSpan={5} className="px-6 py-5">
            <div className="rounded-lg border bg-white shadow-sm p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 rounded-md border bg-gray-50 p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {tTable("seatsReserved")}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {data?.numberOfSeats ?? "N/A"}{" "}
                      <span className="text-gray-400">/ {data?.totalSeats ?? "N/A"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-md border bg-gray-50 p-4">
                  <Users className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {tTable("availableSeats")}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {data?.availableSeats ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-md border bg-gray-50 p-4">
                  <Users className="h-5 w-5 text-sky-600 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {tTable("usedSeats")}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {data?.usedSeats ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-md border bg-gray-50 p-4">
                  <CalendarClock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {tTable("confirmationDateInner")}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {data?.confirmedAt
                        ? formatDate(data.confirmedAt, {
                          locale: "es-ES",
                          format: "short",
                        })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {data?.subGuests && data.subGuests.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">
                      {tTable("subGuests")} ({data.subGuests.length})
                    </p>
                  </div>
                  <SubGuestsRow subGuests={data.subGuests} />
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  );
};


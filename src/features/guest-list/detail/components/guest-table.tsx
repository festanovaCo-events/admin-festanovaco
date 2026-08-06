"use client";

import { useTranslations } from "next-intl";
import type { GuestTableProps } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { GuestTableRow } from "./guest-table-row";

export const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  expandedGuests,
  expandedGuestData,
  loadingGuestIds,
  onToggleGuestExpansion,
  onCopyInvitationUrl,
  searchQuery,
}) => {
  const tTable = useTranslations("guestList.details.table");
  const t = useTranslations("guestList.details");

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("name")}
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("email")}
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("phone")}
            </th>
            <th className="text-center py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("status")}
            </th>
            <th className="text-center py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("showMoreDetails")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <GuestTableRow
                key={guest.id}
                guest={guest}
                index={index}
                isExpanded={expandedGuests.has(guest.id)}
                isLoading={loadingGuestIds.has(guest.id)}
                data={expandedGuestData[guest.id]}
                onToggleExpand={() => onToggleGuestExpansion(guest)}
                onCopyInvitationUrl={onCopyInvitationUrl}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-12 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-base font-medium">{t("noGuests")}</p>
                  {searchQuery && (
                    <p className="text-sm text-gray-400">
                      {t("noGuestsSearch")}
                    </p>
                  )}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

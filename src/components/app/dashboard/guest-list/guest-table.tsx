"use client";

import { useTranslations } from "next-intl";
import { Guest } from "@/interfaces";
import { GuestTableRow } from "./guest-table-row";
import type { GuestTableProps } from "@/interfaces/components/app/dashboard/guest-list";

export const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  expandedGuests,
  onToggleGuestExpansion,
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
            <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("confirmationDate")}
            </th>
            <th className="text-center py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("numberOfSeats")}
            </th>
            <th className="text-center py-4 px-6 font-semibold text-gray-900 text-sm">
              {tTable("subGuests")}
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
                onToggleExpand={() => onToggleGuestExpansion(guest.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-500">
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


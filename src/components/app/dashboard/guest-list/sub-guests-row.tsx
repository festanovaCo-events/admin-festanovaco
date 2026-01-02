"use client";

import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubGuest } from "@/interfaces";
import { SubGuestCard } from "./sub-guest-card";

interface SubGuestsRowProps {
  subGuests: SubGuest[];
}

export const SubGuestsRow: React.FC<SubGuestsRowProps> = ({ subGuests }) => {
  const tTable = useTranslations("guestList.details.table");

  return (
    <tr className="bg-blue-50/30">
      <td colSpan={7} className="py-4 px-6">
        <div className="pl-8 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-gray-900 text-sm">
              {tTable("subGuestsList")} ({subGuests.length})
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {subGuests.map((subGuest) => (
              <SubGuestCard key={subGuest.id} subGuest={subGuest} />
            ))}
          </div>
        </div>
      </td>
    </tr>
  );
};


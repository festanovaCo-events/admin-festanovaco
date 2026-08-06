"use client";

import type { SubGuest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import type { SubGuestsRowProps } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { SubGuestCard } from "./sub-guest-card";

export const SubGuestsRow: React.FC<SubGuestsRowProps> = ({ subGuests }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {subGuests.map((subGuest: SubGuest) => (
        <SubGuestCard key={subGuest.id} subGuest={subGuest} />
      ))}
    </div>
  );
};

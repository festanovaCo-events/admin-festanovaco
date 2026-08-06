"use client";

import type { SubGuestCardProps } from "@/interfaces/components/app/dashboard/guest-list/interfaces";

export const SubGuestCard: React.FC<SubGuestCardProps> = ({ subGuest }) => {
  return (
    <div className="px-3 py-1.5 rounded-full border bg-white shadow-sm text-sm text-gray-700 hover:shadow-md transition">
      <span className="font-medium">{subGuest.name}</span>
    </div>
  );
};

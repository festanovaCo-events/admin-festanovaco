"use client";

import { SubGuest } from "@/interfaces";

interface SubGuestCardProps {
  subGuest: SubGuest;
}

export const SubGuestCard: React.FC<SubGuestCardProps> = ({ subGuest }) => {
  return (
    <div className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
      <div className="space-y-1">
        <p className="font-medium text-gray-900 text-sm">{subGuest.name}</p>
        {subGuest.email && (
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <span className="text-gray-400">@</span>
            {subGuest.email}
          </p>
        )}
        {subGuest.phone && (
          <p className="text-xs text-gray-600">{subGuest.phone}</p>
        )}
      </div>
    </div>
  );
};


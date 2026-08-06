"use client";

import type { FC } from "react";
import type { InfoRowProps } from "@/interfaces/components/common/info-display/info-row.interface";
import { cn } from "@/shared/lib/utils";

export const InfoRow: FC<InfoRowProps> = ({
  icon,
  label,
  value,
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="h-5 w-5 text-gray-400 mt-0.5 shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
};

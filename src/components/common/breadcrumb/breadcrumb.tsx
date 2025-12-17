"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import { BreadcrumbProps } from "@/interfaces";

export const Breadcrumb: FC<BreadcrumbProps> = ({ text, className }) => {
  return (
    <p className={cn("text-sm text-gray-600 mt-1", className)}>
      {text}
    </p>
  );
};


"use client";

import type { FC } from "react";
import type { BreadcrumbProps } from "@/interfaces/components/common/breadcrumb/breadcrumb.interface";
import { cn } from "@/shared/lib/utils";

export const Breadcrumb: FC<BreadcrumbProps> = ({ text, className }) => {
  return <p className={cn("text-sm text-gray-600 mt-1", className)}>{text}</p>;
};

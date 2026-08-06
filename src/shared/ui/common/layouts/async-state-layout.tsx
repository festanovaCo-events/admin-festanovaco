"use client";

import type { FC } from "react";
import type { AsyncStateLayoutProps } from "@/interfaces/components/common/layouts/async-state-layout.interface";

export const AsyncStateLayout: FC<AsyncStateLayoutProps> = ({
  isLoading,
  error,
  skeleton,
  errorComponent,
  children,
}) => {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (error) {
    return <>{errorComponent}</>;
  }

  return <>{children}</>;
};

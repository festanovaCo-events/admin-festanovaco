"use client";

import { FC, ReactNode } from "react";
import { AsyncStateLayoutProps } from "@/interfaces";

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

import { ReactNode } from "react";

export interface AsyncStateLayoutProps {
  isLoading: boolean;
  error: string | null;
  skeleton: ReactNode;
  errorComponent: ReactNode;
  children: ReactNode;
}

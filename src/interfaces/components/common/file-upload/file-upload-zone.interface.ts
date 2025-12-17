import { ReactNode } from "react";

export interface FileUploadZoneProps {
  id: string;
  accept: string;
  multiple?: boolean;
  icon: ReactNode;
  label: string;
  description?: string;
  formats?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  hasFile?: boolean;
  fileName?: string;
}


import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

export interface FormFieldWithIconProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  icon: ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
}


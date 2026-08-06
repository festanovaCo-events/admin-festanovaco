"use client";

import type { FC } from "react";
import type { FormFieldWithIconProps } from "@/interfaces/components/common/form-fields/form-field-with-icon.interface";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/shadcn/ui/form";
import { Input } from "@/shared/ui/shadcn/ui/input";

export const FormFieldWithIcon: FC<FormFieldWithIconProps> = ({
  form,
  name,
  label,
  icon,
  type = "text",
  placeholder,
  className,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel htmlFor={name} className="flex items-center gap-2">
            {icon}
            {label}
          </FormLabel>
          <FormControl>
            <Input id={name} type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

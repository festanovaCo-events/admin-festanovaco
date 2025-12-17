"use client";

import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { FormFieldWithIconProps } from "@/interfaces";

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
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


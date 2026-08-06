"use client";

import { ArrowUpDown } from "lucide-react";
import type { SortSelectProps } from "@/interfaces/components/common/sort-select/sort-select.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/ui/select";

export const SortSelect: React.FC<SortSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  triggerClassName = "w-auto min-w-[140px] gap-3",
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`${triggerClassName} cursor-pointer`}>
        <div className="flex items-center gap-1">
          <ArrowUpDown className="h-4 w-4 shrink-0" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

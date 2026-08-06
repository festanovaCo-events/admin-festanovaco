"use client";

import Image from "next/image";
import type React from "react";
import type { IconDropdownProps } from "@/interfaces/components/common/dropdowns/icon-dropdown.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/shadcn/ui/dropdown-menu";

export const IconDropdown: React.FC<IconDropdownProps> = ({
  options,
  onSelect,
  iconSize = 30,
  children,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => onSelect(option)}>
            <Image
              src={option.src}
              alt={option.label}
              width={iconSize}
              height={iconSize}
              style={{ height: "auto" }}
              draggable={false}
            />
            <span className="ml-2 text-sm font-normal">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

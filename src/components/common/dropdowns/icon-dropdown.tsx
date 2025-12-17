"use client";

import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shadcn/ui/dropdown-menu";
import { IconDropdownProps } from "@/interfaces";

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

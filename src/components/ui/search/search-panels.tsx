"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import { NAVIGATION_ITEMS } from "@/constants";
import { SearchDialogProps } from "@/interfaces";
import { Separator } from "@/components/shadcn/ui/separator";

export const SearchPanels: FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  const handleSelect = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={false}
    >
      <div className="flex items-center p-3">
        <CommandInput
          placeholder="Search..."
          className="border-none focus:ring-0"
        />
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground">
          Esc
        </kbd>
      </div>
      <Separator />
      <CommandList className="max-h-[400px] px-3 py-4">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {NAVIGATION_ITEMS.map((item) => (
            <CommandItem
              key={item.path}
              value={item.title}
              onSelect={() => handleSelect(item.path)}
              className="flex items-center justify-between px-4 py-3 aria-selected:border-2 aria-selected:border-cyan-400 aria-selected:bg-cyan-50/50"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-gray-500">{item.path}</span>
              </div>
              <span className="text-sm text-gray-600">{item.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

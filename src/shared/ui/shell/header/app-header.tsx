"use client";

import { Search, Settings } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import { FLAGS } from "@/constants/flags";
import { usePathname, useRouter } from "@/shared/i18n/routing";
import { Avatar } from "@/shared/ui/common/avatar/avatar";
import { IconDropdown } from "@/shared/ui/common/dropdowns/icon-dropdown";
import { Button } from "@/shared/ui/shadcn/ui/button";
import { SearchPanels } from "../search/search-panels";
import { SheetProfile } from "../sheets/sheet-profile";

export const AppHeader = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChangeSearch = (value: boolean) => {
    setOpenSearch(value);
  };

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLanguage =
    FLAGS.find((lang) => lang.value === locale) || FLAGS[0];

  return (
    <header className="flex h-16 items-center border-b w-full px-6">
      <div className="flex items-center gap-2 justify-end w-full">
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-2 text-gray-500 hover:text-gray-900 md:flex cursor-pointer"
          onClick={() => setOpenSearch(true)}
        >
          <Search className="h-4 w-4" />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘K</span>
          </kbd>
        </Button>

        <IconDropdown
          options={FLAGS}
          onSelect={(option) => handleLanguageChange(option.value)}
          iconSize={30}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 cursor-pointer"
          >
            <Image
              src={currentLanguage.src}
              alt={currentLanguage.label}
              width={30}
              height={30}
              style={{ height: "auto" }}
              draggable={false}
            />
          </Button>
        </IconDropdown>

        <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer">
          <Settings className="h-5 w-5 text-gray-500 animate-spin [animation-duration:3s]" />
        </Button>

        <SheetProfile>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full p-0 cursor-pointer"
          >
            <Avatar
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              fallback="CN"
            />
          </Button>
        </SheetProfile>

        <SearchPanels open={openSearch} onOpenChange={handleChangeSearch} />
      </div>
    </header>
  );
};

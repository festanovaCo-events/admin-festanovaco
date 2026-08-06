"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function useListHandler() {
  const router = useRouter();
  const locale = useLocale();

  const onGoToEventList = () => {
    router.push(`/${locale}/dashboard/event/list`);
  };

  return {
    onGoToEventList,
  };
}

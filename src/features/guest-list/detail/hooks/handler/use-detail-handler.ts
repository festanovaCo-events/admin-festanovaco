"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { Guest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import {
  getInvitationInfoByToken,
  mapInvitationInfoToAugment,
} from "../data/detail";
import type { DetailState } from "../state/use-detail-state";

type UseDetailHandlerParams = Pick<
  DetailState,
  | "expandedGuests"
  | "setExpandedGuests"
  | "expandedGuestData"
  | "setExpandedGuestData"
  | "setLoadingGuestIds"
>;

export function useDetailHandler({
  expandedGuests,
  setExpandedGuests,
  expandedGuestData,
  setExpandedGuestData,
  setLoadingGuestIds,
}: UseDetailHandlerParams) {
  const router = useRouter();
  const tTable = useTranslations("guestList.details.table");

  const onBack = () => {
    router.back();
  };

  const onToggleGuestExpansion = async (guest: Guest) => {
    const guestId = guest.id;
    const isExpanded = expandedGuests.has(guestId);

    if (!isExpanded && guest.invitationToken && !expandedGuestData[guestId]) {
      setLoadingGuestIds((prev) => new Set(prev).add(guestId));

      try {
        const info = await getInvitationInfoByToken(guest.invitationToken);
        const augmented = mapInvitationInfoToAugment(info);
        setExpandedGuestData((prev) => ({ ...prev, [guestId]: augmented }));
      } finally {
        setLoadingGuestIds((prev) => {
          const next = new Set(prev);
          next.delete(guestId);
          return next;
        });
      }
    }

    setExpandedGuests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(guestId)) {
        newSet.delete(guestId);
      } else {
        newSet.add(guestId);
      }
      return newSet;
    });
  };

  const onCopyInvitationUrl = async (url: string | null | undefined) => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      toast.success(tTable("invitationUrlCopied"));
    } catch {
      toast.error(tTable("invitationUrlCopyError"));
    }
  };

  return {
    onBack,
    onToggleGuestExpansion,
    onCopyInvitationUrl,
  };
}

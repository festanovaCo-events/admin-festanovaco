"use client";

import { GuestListDetailView } from "@/features/guest-list/detail/components/guest-list-detail-view";
import { useGuestListDetail } from "@/features/guest-list/detail/hooks/use-detail";

export default function GuestListDetailPage() {
  const props = useGuestListDetail();
  return <GuestListDetailView {...props} />;
}

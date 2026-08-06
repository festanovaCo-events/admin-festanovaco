"use client";

import { GuestListView } from "@/features/guest-list/list/components/guest-list-view";
import { useGuestList } from "@/features/guest-list/list/hooks/use-list";

export default function GuestListPage() {
  const props = useGuestList();
  return <GuestListView {...props} />;
}

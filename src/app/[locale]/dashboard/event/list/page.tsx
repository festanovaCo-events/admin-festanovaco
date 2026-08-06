"use client";

import { EventListView } from "@/features/event/list/components/event-list-view";
import { useEventList } from "@/features/event/list/hooks/use-list";

export default function EventListPage() {
  const props = useEventList();
  return <EventListView {...props} />;
}

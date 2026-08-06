"use client";

import { EventDetailView } from "@/features/event/detail/components/event-detail-view";
import { useEventDetail } from "@/features/event/detail/hooks/use-detail";

export default function EventDetailPage() {
  const props = useEventDetail();
  return <EventDetailView {...props} />;
}

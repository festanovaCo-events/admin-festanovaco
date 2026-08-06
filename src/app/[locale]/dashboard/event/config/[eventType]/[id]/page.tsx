"use client";

import { EventConfigView } from "@/features/event/config/components/event-config-view";
import { useEventConfig } from "@/features/event/config/hooks/use-config";

const EventConfigPage = () => {
  const props = useEventConfig();
  return <EventConfigView {...props} />;
};

export default EventConfigPage;

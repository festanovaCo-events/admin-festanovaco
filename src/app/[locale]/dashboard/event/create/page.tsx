"use client";

import { CreateEventView } from "@/features/event/create/components/create-event-view";
import { useCreateEvent } from "@/features/event/create/hooks/use-create";

const CreateEventPage = () => {
  const props = useCreateEvent();
  return <CreateEventView {...props} />;
};

export default CreateEventPage;

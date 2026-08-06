"use client";

import { useEffect } from "react";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { listEvents } from "../data/list";

type UseListEffectParams = {
  execute: (requestFn: () => Promise<Event[]>) => void;
  setEvents: (events: Event[]) => void;
};

export function useListEffect({ execute, setEvents }: UseListEffectParams) {
  useEffect(() => {
    execute(async () => {
      const events = await listEvents();
      setEvents(events);
      return events;
    });
  }, [execute, setEvents]);
}

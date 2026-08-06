"use client";

import { useEffect } from "react";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { getEventById } from "../data/detail";

type UseDetailEffectParams = {
  eventId: string;
  execute: (requestFn: () => Promise<Event | null>) => void;
};

export function useDetailEffect({ eventId, execute }: UseDetailEffectParams) {
  useEffect(() => {
    execute(async () => await getEventById(eventId));
  }, [execute, eventId]);
}

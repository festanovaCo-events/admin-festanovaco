"use client";

import { useEffect } from "react";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import type { Guest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { getEventById, getInvitationsByEvent } from "../data/detail";

type UseDetailEffectParams = {
  eventId: string;
  fetchEvent: (requestFn: () => Promise<Event | null>) => void;
  fetchGuests: (requestFn: () => Promise<Guest[]>) => void;
};

export function useDetailEffect({
  eventId,
  fetchEvent,
  fetchGuests,
}: UseDetailEffectParams) {
  useEffect(() => {
    if (!eventId) return;
    fetchEvent(async () => await getEventById(eventId));
    fetchGuests(async () => await getInvitationsByEvent(eventId));
  }, [fetchEvent, fetchGuests, eventId]);
}

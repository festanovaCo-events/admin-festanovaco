"use client";

import { SpanStatusCode } from "@opentelemetry/api";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { CreateEventRequest } from "@/interfaces/api/event/create/create-event-requests.interface";
import type { EventMode, EventType } from "@/interfaces/api/event/types.interface";
import { context, getTracer, trace } from "@/shared/lib/telemetry/otel";
import { toIsoUtcNoMs } from "@/shared/lib/utils";
import { createEvent } from "../data/create";
import type { CreateState } from "../state/use-create-state";
import type { SimpleCreateEventFormValues } from "../validations/create-event.schema";

type UseCreateHandlerParams = Pick<CreateState, "accountId" | "execute">;

export function useCreateHandler({
  accountId,
  execute,
}: UseCreateHandlerParams) {
  const router = useRouter();
  const t = useTranslations("event.create");

  const onCancel = () => {
    router.back();
  };

  const onSubmit = async (data: SimpleCreateEventFormValues) => {
    if (!accountId) {
      toast.error(t("error.noAccountId"));
      return;
    }

    const span = getTracer("event").startSpan("event.create.submit", {
      attributes: {
        "event.type": data.type,
        "event.title": data.title,
        "event.mode": data.mode,
      },
    });

    await context.with(trace.setSpan(context.active(), span), async () => {
      try {
        await execute(async () => {
          const eventData: CreateEventRequest = {
            accountId,
            title: data.title,
            type: data.type as EventType,
            mode: data.mode as EventMode,
            address: data.address,
            isPublic: data.isPublic,
            capacity: data.capacity,
            startsAt: toIsoUtcNoMs(data.startAt),
            endsAt: toIsoUtcNoMs(data.endAt),
          };

          return await createEvent(eventData);
        });

        span.setStatus({ code: SpanStatusCode.OK });
      } catch (err) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err instanceof Error ? err.message : String(err),
        });
        span.recordException(
          err instanceof Error ? err : new Error(String(err)),
        );
      } finally {
        span.end();
      }
    });
  };

  return { onCancel, onSubmit };
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpanStatusCode } from "@opentelemetry/api";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EVENT_MODES } from "@/constants/event/event-modes";
import { EVENT_TYPES } from "@/constants/event/event-types";
import type { CreateEventRequest } from "@/interfaces/api/event/create/create-event-requests.interface";
import type { CreateEventResponse } from "@/interfaces/api/event/responses.interface";
import type {
  EventMode,
  EventType,
} from "@/interfaces/api/event/types.interface";
import { createEvent } from "@/shared/data/event/post";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useAuth } from "@/shared/hooks/use-auth";
import { context, getTracer, trace } from "@/shared/lib/telemetry/otel";
import { toIsoUtcNoMs } from "@/shared/lib/utils";
import {
  createSimpleEventFormSchema,
  type SimpleCreateEventFormValues,
} from "./validations/create-event.schema";

export function useCreateEvent() {
  const router = useRouter();
  const t = useTranslations("event.create");
  const tValidation = useTranslations("event.create.simple.validation");
  const { accountId } = useAuth();

  const form = useForm<SimpleCreateEventFormValues>({
    resolver: zodResolver(createSimpleEventFormSchema(tValidation)),
    defaultValues: {
      title: "Boda de Juan y María",
      type: EVENT_TYPES.WEDDING,
      mode: EVENT_MODES.ON_SITE,
      address: "",
      isPublic: true,
      capacity: 150,
      startAt: new Date(),
      endAt: new Date(),
    },
  });

  const { isLoading, error, execute } = useAsyncRequest<CreateEventResponse>({
    successMessage: t("success.created"),
    errorMessage: t("error.createFailed"),
    showToast: false,
    initialLoading: false,
    onSuccess: () => {
      router.push("/dashboard/event/list");
    },
  });

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
        const result = await execute(async () => {
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

        if (result !== null) {
          span.setStatus({ code: SpanStatusCode.OK });
        } else {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: "createEvent failed",
          });
        }
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

  return {
    form,
    isLoading,
    error,
    onSubmit,
    onCancel,
  };
}

export type UseCreateEventReturn = ReturnType<typeof useCreateEvent>;

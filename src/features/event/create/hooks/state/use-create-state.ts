"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { EVENT_MODES } from "@/constants/event/event-modes";
import { EVENT_TYPES } from "@/constants/event/event-types";
import type { CreateEventResponse } from "@/interfaces/api/event/responses.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useAuth } from "@/shared/hooks/use-auth";
import {
  createSimpleEventFormSchema,
  type SimpleCreateEventFormValues,
} from "../validations/create-event.schema";

type UseCreateStateParams = {
  onSuccess: () => void;
};

export function useCreateState({ onSuccess }: UseCreateStateParams) {
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
    onSuccess,
  });

  return {
    form,
    accountId,
    isLoading,
    error,
    execute,
  };
}

export type CreateState = ReturnType<typeof useCreateState>;

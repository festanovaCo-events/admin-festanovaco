"use client";

import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { EventConfigFormValues } from "../validations/config-event-form.schema";

type UseConfigEffectParams = {
  eventType: string;
  form: UseFormReturn<EventConfigFormValues>;
};

/** Limpia errores de validación al cambiar de tipo de evento. */
export function useConfigEffect({ eventType, form }: UseConfigEffectParams) {
  useEffect(() => {
    form.clearErrors();
  }, [form]);
}

"use client";

import { useRouter } from "next/navigation";
import { useCreateEffect } from "./effect/use-create-effect";
import { useCreateHandler } from "./handler/use-create-handler";
import { useCreateState } from "./state/use-create-state";

export function useCreateEvent() {
  const router = useRouter();

  const state = useCreateState({
    onSuccess: () => {
      router.push("/dashboard/event/list");
    },
  });

  const handler = useCreateHandler({
    accountId: state.accountId,
    execute: state.execute,
  });

  useCreateEffect();

  return {
    form: state.form,
    isLoading: state.isLoading,
    error: state.error,
    onSubmit: handler.onSubmit,
    onCancel: handler.onCancel,
  };
}

export type UseCreateEventReturn = ReturnType<typeof useCreateEvent>;

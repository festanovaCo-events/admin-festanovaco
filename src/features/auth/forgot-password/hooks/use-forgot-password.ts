"use client";

import { useForgotPasswordEffect } from "./effect/use-forgot-password-effect";
import { useForgotPasswordHandler } from "./handler/use-forgot-password-handler";
import { useForgotPasswordState } from "./state/use-forgot-password-state";

export function useForgotPassword() {
  const state = useForgotPasswordState();
  const handler = useForgotPasswordHandler();
  useForgotPasswordEffect();

  return {
    form: state.form,
    onSubmit: handler.onSubmit,
  };
}

export type UseForgotPasswordReturn = ReturnType<typeof useForgotPassword>;

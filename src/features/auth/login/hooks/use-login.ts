"use client";

import { useRouter } from "@/shared/i18n/routing";
import { useLoginEffect } from "./effect/use-login-effect";
import { useLoginHandler } from "./handler/use-login-handler";
import { useLoginState } from "./state/use-login-state";

export function useLogin() {
  const router = useRouter();

  const state = useLoginState({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handler = useLoginHandler({
    showPassword: state.showPassword,
    setShowPassword: state.setShowPassword,
    execute: state.execute,
  });

  useLoginEffect();

  return {
    form: state.form,
    showPassword: state.showPassword,
    isLoading: state.isLoading,
    onTogglePassword: handler.onTogglePassword,
    onSubmit: handler.onSubmit,
  };
}

export type UseLoginReturn = ReturnType<typeof useLogin>;

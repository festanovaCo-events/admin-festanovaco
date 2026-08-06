"use client";

import { useRouter } from "@/shared/i18n/routing";
import { useRegisterEffect } from "./effect/use-register-effect";
import { useRegisterHandler } from "./handler/use-register-handler";
import { useRegisterState } from "./state/use-register-state";

export function useRegister() {
  const router = useRouter();

  const state = useRegisterState({
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  const handler = useRegisterHandler({
    showPassword: state.showPassword,
    setShowPassword: state.setShowPassword,
    execute: state.execute,
  });

  useRegisterEffect();

  return {
    form: state.form,
    showPassword: state.showPassword,
    isLoading: state.isLoading,
    onTogglePassword: handler.onTogglePassword,
    onSubmit: handler.onSubmit,
  };
}

export type UseRegisterReturn = ReturnType<typeof useRegister>;

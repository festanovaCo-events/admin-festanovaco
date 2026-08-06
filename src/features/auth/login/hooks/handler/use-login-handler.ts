"use client";

import { login } from "../data/login";
import type { LoginState } from "../state/use-login-state";
import type { LoginFormValues } from "../validations/login.schema";

type UseLoginHandlerParams = Pick<
  LoginState,
  "showPassword" | "setShowPassword" | "execute"
>;

export function useLoginHandler({
  showPassword,
  setShowPassword,
  execute,
}: UseLoginHandlerParams) {
  const onTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormValues) => {
    await execute(() => login(data));
  };

  return {
    onTogglePassword,
    onSubmit,
  };
}

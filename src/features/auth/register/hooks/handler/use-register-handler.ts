"use client";

import { formatRegisterData, register } from "../data/register";
import type { RegisterState } from "../state/use-register-state";
import type { RegisterFormValues } from "../validations/register.schema";

type UseRegisterHandlerParams = Pick<
  RegisterState,
  "showPassword" | "setShowPassword" | "execute"
>;

export function useRegisterHandler({
  showPassword,
  setShowPassword,
  execute,
}: UseRegisterHandlerParams) {
  const onTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    const registerData = formatRegisterData(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    );
    await execute(() => register(registerData));
  };

  return {
    onTogglePassword,
    onSubmit,
  };
}

"use client";

import { requestPasswordReset } from "../data/forgot-password";
import type { ForgotPasswordValues } from "../validations/forgot-password.schema";

export function useForgotPasswordHandler() {
  const onSubmit = (data: ForgotPasswordValues) => {
    void requestPasswordReset(data.email);
  };

  return { onSubmit };
}

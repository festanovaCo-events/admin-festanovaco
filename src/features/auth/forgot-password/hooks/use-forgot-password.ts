"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from "./validations/forgot-password.schema";

/** No API call yet for forgot-password; stub for pattern consistency. */
async function requestPasswordReset(email: string): Promise<void> {
  console.log("Password reset request for:", email);
}

export function useForgotPassword() {
  const tValidation = useTranslations("auth.validation");

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(createForgotPasswordSchema(tValidation)),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    void requestPasswordReset(data.email);
  };

  return {
    form,
    onSubmit,
  };
}

export type UseForgotPasswordReturn = ReturnType<typeof useForgotPassword>;

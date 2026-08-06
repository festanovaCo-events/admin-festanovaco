"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from "../validations/forgot-password.schema";

export function useForgotPasswordState() {
  const tValidation = useTranslations("auth.validation");

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(createForgotPasswordSchema(tValidation)),
    defaultValues: {
      email: "",
    },
  });

  return { form };
}

export type ForgotPasswordState = ReturnType<typeof useForgotPasswordState>;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import type { RegisterResponse } from "../data/register";
import {
  createRegisterSchema,
  type RegisterFormValues,
} from "../validations/register.schema";

type UseRegisterStateParams = {
  onSuccess: () => void;
};

export function useRegisterState({ onSuccess }: UseRegisterStateParams) {
  const tValidation = useTranslations("auth.validation");
  const tSuccess = useTranslations("auth.success");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(tValidation)),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { isLoading, execute } = useAsyncRequest<RegisterResponse>({
    initialLoading: false,
    successMessage: tSuccess("register"),
    onSuccess,
  });

  return {
    form,
    showPassword,
    setShowPassword,
    isLoading,
    execute,
  };
}

export type RegisterState = ReturnType<typeof useRegisterState>;

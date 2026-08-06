"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import type { LoginResponse } from "../data/login";
import {
  createLoginSchema,
  type LoginFormValues,
} from "../validations/login.schema";

type UseLoginStateParams = {
  onSuccess: () => void;
};

export function useLoginState({ onSuccess }: UseLoginStateParams) {
  const tValidation = useTranslations("auth.validation");
  const tSuccess = useTranslations("auth.success");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(tValidation)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoading, execute } = useAsyncRequest<LoginResponse>({
    initialLoading: false,
    successMessage: tSuccess("login"),
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

export type LoginState = ReturnType<typeof useLoginState>;

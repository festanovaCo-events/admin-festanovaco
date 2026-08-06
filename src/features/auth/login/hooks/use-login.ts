"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginResponse } from "@/interfaces/api/auth/responses.interface";
import { login } from "@/shared/data/auth/post";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useRouter } from "@/shared/i18n/routing";
import {
  createLoginSchema,
  type LoginFormValues,
} from "./validations/login.schema";

export function useLogin() {
  const router = useRouter();
  const tValidation = useTranslations("auth.validation");
  const tSuccess = useTranslations("auth.success");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(tValidation)),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { isLoading, execute } = useAsyncRequest<LoginResponse>({
    initialLoading: false,
    successMessage: tSuccess("login"),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormValues) => {
    await execute(() => login(data));
  };

  return {
    form,
    showPassword,
    isLoading,
    onTogglePassword,
    onSubmit,
  };
}

export type UseLoginReturn = ReturnType<typeof useLogin>;

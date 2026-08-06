"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterResponse } from "@/interfaces/api/auth/responses.interface";
import { register } from "@/shared/data/auth/post";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useRouter } from "@/shared/i18n/routing";
import { formatRegisterData } from "./format-register-data";
import {
  createRegisterSchema,
  type RegisterFormValues,
} from "./validations/register.schema";

export function useRegister() {
  const router = useRouter();
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
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
    form,
    showPassword,
    isLoading,
    onTogglePassword,
    onSubmit,
  };
}

export type UseRegisterReturn = ReturnType<typeof useRegister>;

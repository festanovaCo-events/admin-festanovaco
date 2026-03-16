"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { AuthLayout } from "@/components/layouts";
import { createLoginSchema, type LoginFormValues } from "@/schema";
import { login, type LoginResponse } from "@/services/auth";
import { useRouter } from "@/i18n/routing";
import { useAsyncRequest } from "@/hooks";

const LoginPage = () => {
  const t = useTranslations("auth.login");
  const tSuccess = useTranslations("auth.success");
  const tValidation = useTranslations("auth.validation");
  const router = useRouter();
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
    successMessage: tSuccess("login"),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await execute(() => login(data));
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">
              {t("subtitle")}{" "}
              <Link
                href="/auth/register"
                className="text-teal-600 hover:text-teal-700 font-medium ml-1"
              >
                {t("getStarted")}
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t("password")}</FormLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-gray-700 hover:text-gray-900"
                      >
                        {t("forgotPassword")}
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={t("passwordPlaceholder")}
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:opacity-50"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("signingIn") || "Iniciando sesión..." : t("signIn")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

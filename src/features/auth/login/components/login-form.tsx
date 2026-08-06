"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import { AuthLayout } from "@/shared/ui/layouts/auth-layout";
import { Button } from "@/shared/ui/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/shadcn/ui/form";
import { Input } from "@/shared/ui/shadcn/ui/input";
import type { LoginFormValues } from "../hooks/validations/login.schema";

export type LoginFormProps = {
  form: UseFormReturn<LoginFormValues>;
  showPassword: boolean;
  isLoading: boolean;
  onTogglePassword: () => void;
  onSubmit: (data: LoginFormValues) => void | Promise<void>;
};

export function LoginForm({
  form,
  showPassword,
  isLoading,
  onTogglePassword,
  onSubmit,
}: LoginFormProps) {
  const t = useTranslations("auth.login");

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
                          onClick={onTogglePassword}
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
                {isLoading
                  ? t("signingIn") || "Iniciando sesión..."
                  : t("signIn")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}

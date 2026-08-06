"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
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
import type { ForgotPasswordValues } from "../hooks/validations/forgot-password.schema";

export type ForgotPasswordFormProps = {
  form: UseFormReturn<ForgotPasswordValues>;
  onSubmit: (data: ForgotPasswordValues) => void;
};

export function ForgotPasswordForm({
  form,
  onSubmit,
}: ForgotPasswordFormProps) {
  const t = useTranslations("auth.forgotPassword");

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              width={0}
              height={0}
              loading="eager"
              src="/assets/auth/forgot.svg"
              alt="Forgot illustration"
              className="max-w-md w-30 h-30"
              draggable={false}
            />

            <h1 className="text-3xl font-semibold text-foreground">
              {t("title")}
            </h1>

            <p className="text-muted-foreground max-w-sm">{t("description")}</p>
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
                        id="email"
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white h-12 text-base cursor-pointer"
              >
                {t("sendRequest")}
              </Button>

              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-1 text-sm text-foreground hover:text-gray-700 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                {t("returnToSignIn")}
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createForgotPasswordSchema, type ForgotPasswordValues } from "@/schema";

const ForgotPasswordPage = () => {
  const t = useTranslations("auth.forgotPassword");
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(createForgotPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Password reset request for:", data.email);
  };

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

            <p className="text-muted-foreground max-w-sm">
              {t("description")}
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
};

export default ForgotPasswordPage;

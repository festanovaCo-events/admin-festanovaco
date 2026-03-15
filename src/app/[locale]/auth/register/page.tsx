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
import { createRegisterSchema, type RegisterFormValues } from "@/schema";
import { register, formatRegisterData, type RegisterResponse } from "@/services/auth.service";
import { useRouter } from "@/i18n/routing";
import { useAsyncRequest } from "@/hooks";

const RegisterPage = () => {
  const t = useTranslations("auth.register");
  const tSuccess = useTranslations("auth.success");
  const tValidation = useTranslations("auth.validation");
  const router = useRouter();
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
    successMessage: tSuccess("register"),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const registerData = formatRegisterData(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );

    await execute(() => register(registerData));
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
                href="/auth/login"
                className="text-teal-600 hover:text-teal-700 font-medium ml-1"
              >
                {t("signIn")}
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("firstName")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("firstName")}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("lastName")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("lastName")}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("email")}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("password")}
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
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("creatingAccount") || "Creando cuenta..." : t("createAccount")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;

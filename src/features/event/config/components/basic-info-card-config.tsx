"use client";

import { useTranslations } from "next-intl";
import type { FC } from "react";
import type { BasicInfoCardProps } from "@/interfaces/components/app/dashboard/event/config/basic-info-card-config.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/shadcn/ui/form";
import { Input } from "@/shared/ui/shadcn/ui/input";
import { Textarea } from "@/shared/ui/shadcn/ui/textarea";

export const BasicInfoCardConfig: FC<BasicInfoCardProps> = ({ form }) => {
  const t = useTranslations("event.config.basicInfo");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="husbandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="husbandName">{t("husbandName")}</FormLabel>
                <FormControl>
                  <Input
                    id="husbandName"
                    placeholder={t("husbandNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wifeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="wifeName">{t("wifeName")}</FormLabel>
                <FormControl>
                  <Input
                    id="wifeName"
                    placeholder={t("wifeNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="quote">{t("quote")}</FormLabel>
              <FormControl>
                <Textarea
                  id="quote"
                  placeholder={t("quotePlaceholder")}
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

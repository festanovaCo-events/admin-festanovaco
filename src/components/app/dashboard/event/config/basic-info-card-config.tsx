"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { BasicInfoCardProps } from "@/interfaces";
import { EventConfigFormValues } from "@/schema";

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

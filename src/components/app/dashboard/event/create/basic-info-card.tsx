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
import { SelectOption } from "@/components/common";
import { EVENT_TYPES } from "@/constants";
import { BasicInfoCardProps } from "@/interfaces";

export const BasicInfoCard: FC<BasicInfoCardProps> = ({ form }) => {
  const t = useTranslations("event.create.basicInfo");
  const tTypes = useTranslations("event.types");
  
  const translatedEventTypes = EVENT_TYPES.map((type) => ({
    value: type.value,
    label: tTypes(type.value),
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">{t("eventTitle")}</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder={t("eventTitlePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">{t("description")}</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder={t("descriptionPlaceholder")}
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SelectOption
                  eventType={field.value ?? ""}
                  setEventType={field.onChange}
                  options={translatedEventTypes}
                  label={t("eventType")}
                  placeholder={t("eventTypePlaceholder")}
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

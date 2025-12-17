"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { CeremonyDetailsCardProps } from "@/interfaces";
import {
  EVENT_CREATE_FIELD_NAMES,
  INPUT_TYPES,
} from "@/constants";

export const CeremonyDetailsCard: FC<CeremonyDetailsCardProps> = ({ form }) => {
  const t = useTranslations("event.create.ceremony");
  return (
    <Card className="border-accent">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={EVENT_CREATE_FIELD_NAMES.CEREMONY_DATE}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={EVENT_CREATE_FIELD_NAMES.CEREMONY_DATE}>
                  <Calendar className="h-4 w-4" />
                  {t("ceremonyDate")}
                </FormLabel>
                <FormControl>
                  <Input id={EVENT_CREATE_FIELD_NAMES.CEREMONY_DATE} type={INPUT_TYPES.DATE} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={EVENT_CREATE_FIELD_NAMES.CEREMONY_TIME}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={EVENT_CREATE_FIELD_NAMES.CEREMONY_TIME}>
                  <Clock className="h-4 w-4" />
                  {t("ceremonyTime")}
                </FormLabel>
                <FormControl>
                  <Input id={EVENT_CREATE_FIELD_NAMES.CEREMONY_TIME} type={INPUT_TYPES.TIME} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name={EVENT_CREATE_FIELD_NAMES.CEREMONY_LOCATION}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={EVENT_CREATE_FIELD_NAMES.CEREMONY_LOCATION}>
                <MapPin className="h-4 w-4" />
                {t("ceremonyLocation")}
              </FormLabel>
              <FormControl>
                <Input
                  id={EVENT_CREATE_FIELD_NAMES.CEREMONY_LOCATION}
                  placeholder={t("ceremonyLocationPlaceholder")}
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

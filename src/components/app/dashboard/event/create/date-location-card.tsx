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
import { DateLocationCardProps } from "@/interfaces";
import {
  EVENT_CREATE_FIELD_NAMES,
  INPUT_TYPES,
} from "@/constants";

export const DateLocationCard: FC<DateLocationCardProps> = ({ form }) => {
  const t = useTranslations("event.create.dateLocation");
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
            name={EVENT_CREATE_FIELD_NAMES.DATE}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={EVENT_CREATE_FIELD_NAMES.DATE}>
                  <Calendar className="h-4 w-4" />
                  {t("eventDate")}
                </FormLabel>
                <FormControl>
                  <Input id={EVENT_CREATE_FIELD_NAMES.DATE} type={INPUT_TYPES.DATE} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={EVENT_CREATE_FIELD_NAMES.TIME}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={EVENT_CREATE_FIELD_NAMES.TIME}>
                  <Clock className="h-4 w-4" />
                  {t("eventTime")}
                </FormLabel>
                <FormControl>
                  <Input id={EVENT_CREATE_FIELD_NAMES.TIME} type={INPUT_TYPES.TIME} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name={EVENT_CREATE_FIELD_NAMES.LOCATION}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={EVENT_CREATE_FIELD_NAMES.LOCATION}>
                <MapPin className="h-4 w-4" />
                {t("eventLocation")}
              </FormLabel>
              <FormControl>
                <Input
                  id={EVENT_CREATE_FIELD_NAMES.LOCATION}
                  placeholder={t("eventLocationPlaceholder")}
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

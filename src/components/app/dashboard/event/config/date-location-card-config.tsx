"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { FormFieldWithIcon } from "@/components/common";
import { DateLocationCardProps } from "@/interfaces";
import { INPUT_TYPES } from "@/constants";

export const DateLocationCardConfig: FC<DateLocationCardProps> = ({ form }) => {
  const t = useTranslations("event.config.dateLocation");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormFieldWithIcon
          form={form}
          name="partyDateTime"
          label={t("partyDateTime")}
          icon={<Calendar className="h-4 w-4" />}
          type={INPUT_TYPES.DATETIME_LOCAL}
        />
      </CardContent>
    </Card>
  );
};

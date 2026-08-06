"use client";

import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { INPUT_TYPES } from "@/constants/event-create";
import type { DateLocationCardProps } from "@/interfaces/components/app/dashboard/event/config/date-location-card-config.interface";
import { FormFieldWithIcon } from "@/shared/ui/common/form-fields/form-field-with-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";

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

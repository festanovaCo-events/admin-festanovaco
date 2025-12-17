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
import { FormFieldWithIcon } from "@/components/common";
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
          <FormFieldWithIcon
            form={form}
            name={EVENT_CREATE_FIELD_NAMES.CEREMONY_DATE}
            label={t("ceremonyDate")}
            icon={<Calendar className="h-4 w-4" />}
            type={INPUT_TYPES.DATE}
          />

          <FormFieldWithIcon
            form={form}
            name={EVENT_CREATE_FIELD_NAMES.CEREMONY_TIME}
            label={t("ceremonyTime")}
            icon={<Clock className="h-4 w-4" />}
            type={INPUT_TYPES.TIME}
          />
        </div>

        <FormFieldWithIcon
          form={form}
          name={EVENT_CREATE_FIELD_NAMES.CEREMONY_LOCATION}
          label={t("ceremonyLocation")}
          icon={<MapPin className="h-4 w-4" />}
          placeholder={t("ceremonyLocationPlaceholder")}
        />
      </CardContent>
    </Card>
  );
};

"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Calendar, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/ui/card";
import { FormFieldWithIcon } from "@/components/common";
import { CeremonyDetailsCardProps } from "@/interfaces";
import { INPUT_TYPES } from "@/constants";

export const CeremonyDetailsCardConfig: FC<CeremonyDetailsCardProps> = ({ form }) => {
  const t = useTranslations("event.config.ceremony");
  return (
    <Card className="border-accent">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormFieldWithIcon
          form={form}
          name="weddingDateTime"
          label={t("weddingDateTime")}
          icon={<Calendar className="h-4 w-4" />}
          type={INPUT_TYPES.DATETIME_LOCAL}
        />

        <FormFieldWithIcon
          form={form}
          name="addressWedding"
          label={t("addressWedding")}
          icon={<MapPin className="h-4 w-4" />}
          placeholder={t("addressWeddingPlaceholder")}
        />
      </CardContent>
    </Card>
  );
};

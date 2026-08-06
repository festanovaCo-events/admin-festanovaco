"use client";

import { Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { INPUT_TYPES } from "@/constants/event-create";
import type { CeremonyDetailsCardProps } from "@/interfaces/components/app/dashboard/event/config/party-details-card-config.interface";
import { FormFieldWithIcon } from "@/shared/ui/common/form-fields/form-field-with-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadcn/ui/card";

export const PartyDetailsCardConfig: FC<CeremonyDetailsCardProps> = ({
  form,
}) => {
  const t = useTranslations("event.config.party");
  const tDate = useTranslations("event.config.dateLocation");
  return (
    <Card className="border-accent">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormFieldWithIcon
          form={form}
          name="partyDateTime"
          label={tDate("partyDateTime")}
          icon={<Calendar className="h-4 w-4" />}
          type={INPUT_TYPES.DATETIME_LOCAL}
        />

        <FormFieldWithIcon
          form={form}
          name="addressParty"
          label={tDate("addressParty")}
          icon={<MapPin className="h-4 w-4" />}
          placeholder={tDate("addressPartyPlaceholder")}
        />
      </CardContent>
    </Card>
  );
};

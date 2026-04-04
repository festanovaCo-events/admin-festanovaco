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

export const PartyDetailsCardConfig: FC<CeremonyDetailsCardProps> = ({ form }) => {
    const t = useTranslations("event.config.party");
    const tDate = useTranslations("event.config.dateLocation");
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
                    label={tDate("partyDateTime")}
                    icon={<Calendar className="h-4 w-4" />}
                    type={INPUT_TYPES.DATETIME_LOCAL}
                />

                <FormFieldWithIcon
                    form={form}
                    name="addressWedding"
                    label={tDate("addressParty")}
                    icon={<MapPin className="h-4 w-4" />}
                    placeholder={tDate("addressPartyPlaceholder")}
                />
            </CardContent>
        </Card>
    );
};


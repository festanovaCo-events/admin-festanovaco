"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/ui/button";
import type { EventConfigNotFoundProps } from "@/interfaces/components/app/dashboard/event/config/event-config-not-found.interface";

export const EventConfigNotFound = ({ onBack }: EventConfigNotFoundProps) => {
    const router = useRouter();
    const t = useTranslations("event.config.notFound");

    const handleBack = () => {
        if (onBack) {
            onBack();
            return
        }

        router.push("/dashboard/event/list");
    };

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("title")}
                </h1>
                <Button
                    onClick={handleBack}
                    variant="link"
                    className="text-blue-600 hover:text-blue-800"
                >
                    {t("backToList")}
                </Button>
            </div>
        </div>
    );
};

"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/ui/button";
import { useStatusOverlayStore } from "@/stores/status-overlay";

const TYPE_TO_KEYS: Record<string, { title: string; description: string }> = {
    forbidden: { title: "forbidden", description: "forbiddenDesc" },
    badRequest: { title: "badRequest", description: "badRequestDesc" },
    internalServerError: { title: "internalServerError", description: "internalServerErrorDesc" },
    notFound: { title: "notFound", description: "notFoundDesc" },
    noInternet: { title: "noInternet", description: "noInternetDesc" },
    maintenance: { title: "maintenance", description: "maintenanceDesc" },
};

export const StatusOverlay = ({ children }: { children?: ReactNode }) => {
    const { isVisible, type, details, onRetry, hideStatus } = useStatusOverlayStore();
    const tStatus = useTranslations("common.status");
    const tActions = useTranslations("common.actions");
    const pathname = usePathname();

    useEffect(() => {
        if (isVisible) {
            hideStatus();
        }
    }, [pathname]);

    if (!isVisible || !type) {
        return <>{children}</>;
    }
    const keys = TYPE_TO_KEYS[type] ?? TYPE_TO_KEYS.internalServerError;

    return (
        <div className="relative h-full">
            <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm">
                <div className="min-h-full flex items-center justify-center px-4">
                    <div className="flex flex-col items-center text-center max-w-xl">
                        <h2 className="text-xl font-semibold text-gray-900">{tStatus(keys.title)}</h2>
                        <p className="text-gray-500 mt-2">{tStatus(keys.description)}</p>
                        {details && <p className="text-gray-400 text-sm mt-2">{details}</p>}
                        <div className="mt-6 flex gap-3">
                            {onRetry && (
                                <Button className="cursor-pointer" onClick={onRetry}>
                                    {tActions("retry")}
                                </Button>
                            )}
                            <Button variant="outline" className="cursor-pointer" onClick={hideStatus}>
                                {tActions("close")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


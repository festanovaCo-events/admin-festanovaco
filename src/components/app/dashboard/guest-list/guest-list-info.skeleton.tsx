"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";

export const GuestListInfoSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="w-40 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-32 h-5 bg-gray-300 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-40 h-5 bg-gray-300 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-16 h-7 bg-gray-300 rounded animate-pulse" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


"use client";

import { Card, CardContent } from "@/components/shadcn/ui/card";

export const GuestStatsCardsSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
							<div className="w-20 h-7 bg-gray-300 rounded animate-pulse" />
						</div>
						<div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
							<div className="w-20 h-7 bg-gray-300 rounded animate-pulse" />
						</div>
						<div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
							<div className="w-20 h-7 bg-gray-300 rounded animate-pulse" />
						</div>
						<div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};


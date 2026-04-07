"use client";

import { Button } from "@/components/shadcn/ui/button";

export const GuestSearchAndFiltersSkeleton = () => {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-6">
			<div className="flex-1">
				<div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
			</div>
			<div className="flex gap-2">
				<Button variant="outline" disabled className="w-20 h-10 animate-pulse" />
				<Button variant="outline" disabled className="w-24 h-10 animate-pulse" />
				<Button variant="outline" disabled className="w-24 h-10 animate-pulse" />
				<Button variant="outline" disabled className="w-24 h-10 animate-pulse" />
			</div>
		</div>
	);
};


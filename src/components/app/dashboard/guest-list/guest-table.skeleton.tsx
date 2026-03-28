"use client";

export const GuestTableSkeleton = () => {
	return (
		<div className="overflow-x-auto border rounded-lg">
			<table className="w-full">
				<thead className="bg-gray-50">
					<tr>
						<th className="text-left py-4 px-6">
							<div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
						</th>
						<th className="text-left py-4 px-6">
							<div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
						</th>
						<th className="text-left py-4 px-6">
							<div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
						</th>
						<th className="text-center py-4 px-6">
							<div className="mx-auto w-24 h-4 bg-gray-200 rounded animate-pulse" />
						</th>
						<th className="text-center py-4 px-6">
							<div className="mx-auto w-28 h-4 bg-gray-200 rounded animate-pulse" />
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{Array.from({ length: 6 }).map((_, i) => (
						<tr key={i} className="animate-pulse">
							<td className="py-4 px-6">
								<div className="w-40 h-4 bg-gray-200 rounded" />
							</td>
							<td className="py-4 px-6">
								<div className="w-56 h-4 bg-gray-200 rounded" />
							</td>
							<td className="py-4 px-6">
								<div className="w-32 h-4 bg-gray-200 rounded" />
							</td>
							<td className="py-4 px-6">
								<div className="mx-auto w-20 h-6 bg-gray-200 rounded" />
							</td>
							<td className="py-4 px-6">
								<div className="mx-auto w-8 h-8 bg-gray-200 rounded-full" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};


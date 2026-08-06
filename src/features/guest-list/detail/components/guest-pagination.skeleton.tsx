"use client";

export const GuestPaginationSkeleton = () => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="flex items-center gap-2">
        <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

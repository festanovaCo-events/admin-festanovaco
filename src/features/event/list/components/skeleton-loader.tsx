import { EventCardSkeleton } from "./event-card-skeleton";

export const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[...Array(4)].map((_, index) => (
      <EventCardSkeleton key={index} />
    ))}
  </div>
);

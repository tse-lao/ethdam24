import { Skeleton } from "@/components/ui/skeleton";


export default function ClubLoading() {
  return (
    <div className="grid-cols-2 lg:grid-cols-3">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Skeleton key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />
          );
        })}
    </div>
  );
}
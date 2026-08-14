import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <header className="page-heading">
        <Skeleton className="mb-3 h-3 w-32" />
        <Skeleton className="mb-3 h-9 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </header>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-[150px] w-full rounded" />
        ))}
      </div>
    </div>
  );
}

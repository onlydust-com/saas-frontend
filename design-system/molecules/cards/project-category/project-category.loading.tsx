import { Skeleton } from "@/design-system/atoms/skeleton";

export function ProjectCategoryCardLoading() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-4">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-5 w-32" />
    </div>
  );
}

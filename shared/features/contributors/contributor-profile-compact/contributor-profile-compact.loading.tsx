import { Skeleton } from "@/design-system/atoms/skeleton";

export function ContributorProfileCompactLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-20",
      }}
    />
  );
}

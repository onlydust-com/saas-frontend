import { Skeleton } from "@/design-system/atoms/skeleton";

export function TableSortLoading() {
  return (
    <Skeleton
      classNames={{
        base: "h-4 w-4 rounded",
      }}
    />
  );
}

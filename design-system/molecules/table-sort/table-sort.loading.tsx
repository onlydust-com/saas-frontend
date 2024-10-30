import { Skeleton } from "@/design-system/atoms/skeleton";

export function TableSortLoading() {
  return (
    <Skeleton
      classNames={{
        base: "h-xl w-xl rounded",
      }}
    />
  );
}

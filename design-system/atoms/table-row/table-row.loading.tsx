import { Skeleton } from "@/design-system/atoms/skeleton";

export function TableRowLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-14",
      }}
    />
  );
}

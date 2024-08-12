import { Skeleton } from "@/design-system/atoms/skeleton";

export function TableHeaderLoading() {
  return (
    <Skeleton
      classNames={{
        base: "w-full h-12",
      }}
    />
  );
}

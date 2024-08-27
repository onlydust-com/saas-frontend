import { Skeleton } from "@/design-system/atoms/skeleton";

export function AlertLoading() {
  return (
    <Skeleton
      style={{
        width: "100%",
        height: 100,
      }}
    />
  );
}

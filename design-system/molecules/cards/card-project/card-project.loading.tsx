import { Skeleton } from "@/design-system/atoms/skeleton";

export function CardProjectLoading() {
  return (
    <Skeleton
      style={{
        width: "100%",
        height: 100,
      }}
    />
  );
}

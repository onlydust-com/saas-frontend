import { Skeleton } from "@/design-system/atoms/skeleton";

export function CardTransactionLoading() {
  return (
    <Skeleton
      style={{
        width: "100%",
        height: 100,
      }}
    />
  );
}

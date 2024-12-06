import { Skeleton } from "@/design-system/atoms/skeleton";

export function CardProjectMarketplaceLoading() {
  return (
    <Skeleton
      style={{
        width: "100%",
        // TODO: Add the correct height
        height: 100,
      }}
    />
  );
}

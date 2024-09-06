import { Skeleton } from "@/design-system/atoms/skeleton";

export function ProgressBarLoading({
  width = "100%",
  height = 8,
}: {
  width?: string | number;
  height?: string | number;
}) {
  return (
    <Skeleton
      style={{
        width,
        height,
      }}
    />
  );
}

import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function ProgressBarLoading({
  width = "100%",
  height = 8,
}: {
  width?: string | number;
  height?: string | number;
}) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "w-full": !width,
          "h-2": !height,
        }),
      }}
      style={{
        width,
        height,
      }}
    />
  );
}

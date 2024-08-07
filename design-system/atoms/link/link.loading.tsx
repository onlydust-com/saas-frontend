import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function LinkLoading({ width, height }: { width?: string; height?: string }) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "w-full": !width,
          "h-[17px]": !height,
        }),
      }}
      style={{
        width,
        height,
      }}
    />
  );
}

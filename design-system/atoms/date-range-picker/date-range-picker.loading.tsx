import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

export function DateRangePickerLoading({ width, height }: { width?: string; height?: string }) {
  return (
    <Skeleton
      classNames={{
        base: cn({
          "w-full": !width,
          "h-[42px]": !height,
        }),
      }}
      style={{
        width,
        height,
      }}
    />
  );
}

import { ElementType } from "react";
import { tv } from "tailwind-variants";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { TagPort } from "@/design-system/atoms/tag/tag.types";

const skeletonVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    size: {
      xxs: {
        base: "h-[20px] w-[44px] rounded-xs",
      },
      xs: {
        base: "h-[24px] w-[48px] rounded-sm",
      },
      sm: {
        base: "h-[28px] w-[52px] rounded-sm",
      },
      md: {
        base: "h-[32px] w-[56px] rounded-md",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function TagLoading<C extends ElementType = "span">({ size }: TagPort<C>) {
  const { base } = skeletonVariants({ size });

  return (
    <Skeleton
      classNames={{
        base: base(),
      }}
    />
  );
}

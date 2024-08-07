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
      xs: {
        base: "size-6",
      },
      s: {
        base: "size-8",
      },
      m: {
        base: "size-10",
      },
    },
    hideText: {
      true: "",
    },
  },
  compoundVariants: [
    {
      size: "xs",
      hideText: true,
      className: {
        base: "w-[59px]",
      },
    },
    {
      size: "s",
      hideText: true,
      className: {
        base: "w-[69px]",
      },
    },
    {
      size: "m",
      hideText: true,
      className: {
        base: "w-[69px]",
      },
    },
  ],
  defaultVariants: {
    size: "m",
  },
});

export function TagLoading<C extends ElementType = "span">({ size, hideText, shape }: TagPort<C>) {
  const { base } = skeletonVariants({ size, hideText });

  return (
    <Skeleton
      shape={shape === "square" ? "square" : "circle"}
      classNames={{
        base: base(),
      }}
    />
  );
}

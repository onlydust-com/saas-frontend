import { ElementType } from "react";
import { tv } from "tailwind-variants";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ButtonPort } from "./button.types";

const skeletonVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    size: {
      s: {
        base: "size-8",
      },
      m: {
        base: "size-10",
      },
      l: {
        base: "size-12",
      },
      xl: {
        base: "size-14",
      },
    },
    hideText: {
      true: "",
    },
  },
  compoundVariants: [
    {
      size: "s",
      hideText: true,
      className: {
        base: "w-[150px]",
      },
    },
    {
      size: "m",
      hideText: true,
      className: {
        base: "w-[192px]",
      },
    },
    {
      size: "l",
      hideText: true,
      className: {
        base: "w-[200px]",
      },
    },
    {
      size: "xl",
      hideText: true,
      className: {
        base: "w-[226px]",
      },
    },
  ],
  defaultVariants: {
    size: "m",
  },
});

export function ButtonLoading<C extends ElementType = "button">({ size, hideText }: ButtonPort<C>) {
  const { base } = skeletonVariants({ size, hideText });

  return (
    <Skeleton
      classNames={{
        base: base(),
      }}
    />
  );
}

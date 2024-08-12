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
        base: "h-[26px] w-[152px]",
      },
      m: {
        base: "h-[34px] w-[194px]",
      },
      l: {
        base: "h-10 w-[202px]",
      },
      xl: {
        base: "h-[50px] w-[228px]",
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
        base: "size-[26px]",
      },
    },
    {
      size: "m",
      hideText: true,
      className: {
        base: "size-[34px]",
      },
    },
    {
      size: "l",
      hideText: true,
      className: {
        base: "size-10",
      },
    },
    {
      size: "xl",
      hideText: true,
      className: {
        base: "size-[50px]",
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

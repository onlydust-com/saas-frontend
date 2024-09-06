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
      xs: {
        base: "h-[24px] w-[95px]",
      },
      sm: {
        base: "h-[32px] w-[117px]",
      },
      md: {
        base: "h-[40px] w-[133px]",
      },
      lg: {
        base: "h-[48px] w-[160px]",
      },
    },
    iconOnly: {
      true: "",
    },
  },
  compoundVariants: [
    {
      size: "xs",
      iconOnly: true,
      className: {
        base: "size-[24px]",
      },
    },
    {
      size: "sm",
      iconOnly: true,
      className: {
        base: "size-[32px]",
      },
    },
    {
      size: "md",
      iconOnly: true,
      className: {
        base: "size-[40px]",
      },
    },
    {
      size: "lg",
      iconOnly: true,
      className: {
        base: "size-[48px]",
      },
    },
  ],
  defaultVariants: {
    size: "md",
  },
});

export function ButtonLoading<C extends ElementType = "button">({ size, iconOnly }: ButtonPort<C>) {
  const { base } = skeletonVariants({ size, iconOnly });

  return (
    <Skeleton
      classNames={{
        base: base(),
      }}
    />
  );
}

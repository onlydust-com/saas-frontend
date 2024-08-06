import { ElementType } from "react";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ButtonPort } from "./button.types";

export function ButtonLoading<C extends ElementType = "button">({ size, hideText }: ButtonPort<C>) {
  const [w, h] = (() => {
    if (hideText) {
      if (size === "s") {
        return [24, 24];
      }

      if (size === "l") {
        return [40, 40];
      }

      return [32, 32];
    }
    if (size === "s") {
      return [112, 24];
    }

    if (size === "l") {
      return [144, 40];
    }

    return [136, 32];
  })();

  return <Skeleton width={w} height={h} />;
}

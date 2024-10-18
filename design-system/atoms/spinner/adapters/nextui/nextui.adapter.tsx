import { Spinner } from "@nextui-org/react";

import { SpinnerNextUiVariants } from "@/design-system/atoms/spinner/adapters/nextui/nextui.variants";

import { cn } from "@/shared/helpers/cn";

import { SpinnerPort } from "../../spinner.types";

export function SpinnerNextUiAdapter({ classNames }: SpinnerPort) {
  const slots = SpinnerNextUiVariants();

  return (
    <Spinner
      color="default"
      size="sm"
      classNames={{
        wrapper: cn(slots.base(), classNames?.base),
        circle2: cn(slots.circle(), classNames?.circle),
        circle1: cn(slots.circle(), classNames?.circle),
      }}
    />
  );
}

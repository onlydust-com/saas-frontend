import { ChevronLeft, ChevronRight } from "lucide-react";
import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { PaginationDefaultVariants } from "@/design-system/molecules/pagination/adapters/default/default.variants";

import { cn } from "@/shared/helpers/cn";

import { PaginationPort } from "../../pagination.types";

export function PaginationDefaultAdapter<C extends ElementType = "div">({
  classNames,
  as,
  disablePrev = false,
  disableNext = false,
  total = 0,
  current = 0,
  onNext,
  onPrev,
  isInfinite,
}: PaginationPort<C>) {
  const Component = as || "div";
  const slots = PaginationDefaultVariants();
  const label = isInfinite ? `${current}` : `${current} / ${total}`;
  return (
    <Component className={cn(slots.base(), classNames?.base)}>
      <Button
        size={"md"}
        onClick={onPrev}
        isDisabled={disablePrev}
        iconOnly
        startIcon={{ component: ChevronLeft }}
        variant="secondary"
      />
      <Button
        as={"div"}
        size={"md"}
        variant="secondary"
        canInteract={false}
        classNames={{
          label: "leading-4",
        }}
      >
        {label}
      </Button>
      <Button
        onClick={onNext}
        size={"md"}
        variant="secondary"
        isDisabled={disableNext}
        iconOnly
        startIcon={{ component: ChevronRight }}
      />
    </Component>
  );
}

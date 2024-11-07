import { Check } from "lucide-react";
import { SyntheticEvent } from "react";

import { AnyType } from "@/core/kernel/types";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { MenuItemDefaultVariants } from "@/design-system/molecules/menu-item/adapters/default/default.variants";

import { cn } from "@/shared/helpers/cn";

import { MenuItemPort } from "../../menu-item.types";

export function MenuItemDefaultAdapter<T extends AnyType>({
  classNames,
  label,
  startContent,
  isDisabled,
  attr = {},
  id,
  isSelected,
  showIndicatorOnSelected = true,
  onClick,
}: MenuItemPort<T>) {
  const slots = MenuItemDefaultVariants({ isDisabled, isSelected });

  function handleClick(e: SyntheticEvent) {
    e?.stopPropagation();
    onClick?.(id);
  }

  return (
    <div {...attr} className={cn(slots.base(), classNames?.base)} onClick={handleClick}>
      <div className={cn(slots.inner(), classNames?.inner)}>
        <div className={"flex flex-1 items-center justify-start gap-md"}>
          {startContent}
          <Typo size={"sm"} classNames={{ base: slots.content() }}>
            {label}
          </Typo>
        </div>
        {showIndicatorOnSelected && isSelected ? <Icon component={Check} size={"sm"} /> : null}
      </div>
    </div>
  );
}

import { Check } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { MenuItemPort } from "../../menu-item.types";
import { MenuItemNextUiVariants } from "./next-ui.variants";

export function MenuItemNextUiAdapter({
  classNames,
  label,
  startContent,
  isDisabled,
  attr = {},
  isSelected,
  showIndicatorOnSelected = true,
}: MenuItemPort) {
  const slots = MenuItemNextUiVariants({ isDisabled, isSelected });

  return (
    <div {...attr} className={cn(slots.base(), classNames?.base)}>
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

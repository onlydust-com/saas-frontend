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
}: MenuItemPort) {
  const slots = MenuItemNextUiVariants({ isDisabled, isSelected });

  return (
    <div {...attr} className={cn(slots.base(), classNames?.base)}>
      <div className={"flex w-full items-center justify-between"}>
        <div className={cn(slots.inner(), classNames?.inner)}>
          {startContent}
          <Typo size={"sm"} classNames={{ base: slots.content() }}>
            {label}
          </Typo>
        </div>
        {/*CHECK INDICATOR*/}
      </div>
    </div>
  );
}

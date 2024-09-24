import { Typo } from "@/design-system/atoms/typo";
import { MenuItemLabelPort } from "@/design-system/molecules/menu-item";
import { MenuItemDefaultVariants } from "@/design-system/molecules/menu-item/adapters/default/default.variants";

import { cn } from "@/shared/helpers/cn";

export function MenuItemLabel({ classNames, label, startContent, attr = {} }: MenuItemLabelPort) {
  const slots = MenuItemDefaultVariants();

  return (
    <div {...attr} className={cn(slots.base(), classNames?.base, "pointer-events-none")}>
      <div className={cn(slots.inner(), classNames?.inner)}>
        <div className={"flex flex-1 items-center justify-start gap-md"}>
          {startContent}
          <Typo size={"xs"} color={"tertiary"}>
            {label}
          </Typo>
        </div>
      </div>
    </div>
  );
}

import { MenuItemLabelPort } from "@/design-system/molecules/menu-item";

import { cn } from "@/shared/helpers/cn";

export function MenuItemSeparator({ classNames, attr = {} }: MenuItemLabelPort) {
  return (
    <div {...attr} className={cn(classNames?.base, "pointer-events-none my-xs h-px w-full bg-background-tertiary")} />
  );
}

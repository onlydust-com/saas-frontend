import { TabItem } from "@/design-system/molecules/tabs/tab-item";

import { cn } from "@/shared/helpers/cn";

import { TabsPort } from "../../tabs.types";
import { TabsDefaultVariants } from "./default.variants";

export function TabsDefaultAdapter({
  classNames,
  tabs,
  variant = "flat",
  size,
  selectedId,
  onTabClick,
  isFullWidth = false,
  layout = "horizontal",
}: TabsPort) {
  const slots = TabsDefaultVariants({ layout, variant, isFullWidth });

  function handleTabClick(id: string) {
    if (selectedId !== id) {
      onTabClick?.(id);
    }
  }

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      {tabs.map(tab => (
        <TabItem
          key={tab.id}
          variant={variant}
          isSelected={selectedId === tab.id}
          size={size}
          {...tab}
          classNames={{
            ...(classNames?.item || {}),
            base: cn(slots.item(), classNames?.item?.base),
          }}
          onClick={id => {
            handleTabClick(id);
            tab.onClick?.(id);
          }}
        />
      ))}
    </div>
  );
}

import { ChevronDown } from "lucide-react";
import { ElementType, useMemo } from "react";

import { Input } from "@/design-system/atoms/input";
import { Menu } from "@/design-system/molecules/menu";

import { cn } from "@/shared/helpers/cn";

import { SelectPort } from "../../select.types";
import { SelectDefaultVariants } from "./default.variants";

export function SelectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  selectedIds,
  onSelect,
  items,
  closeOnSelect,
  onNextPage,
  hasNextPage,
  ...inputProps
}: SelectPort<C>) {
  const Component = as || "div";
  const slots = SelectDefaultVariants();

  const selectedValues = useMemo(() => {
    if (selectedIds?.length) {
      return selectedIds
        .map(id => {
          const findInItems = items.find(item => item.id === id);
          if (findInItems) {
            return findInItems.label;
          }

          return id;
        })
        .join(", ");
    }
  }, [selectedIds, items]);

  function handleSelect(...args: Parameters<NonNullable<SelectPort<C>["onSelect"]>>) {
    onSelect?.(args[0]);
  }

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <Menu
        items={items}
        onSelect={handleSelect}
        selectedIds={selectedIds}
        closeOnSelect={closeOnSelect}
        onNextPage={onNextPage}
        hasNextPage={hasNextPage}
      >
        <Input value={selectedValues} endIcon={{ component: ChevronDown }} canInteract={false} {...inputProps} />
      </Menu>
    </Component>
  );
}

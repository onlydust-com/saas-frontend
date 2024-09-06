import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { SharedSelection } from "@nextui-org/system";

import { MenuItem } from "@/design-system/molecules/menu-item";

import { cn } from "@/shared/helpers/cn";

import { MenuPort } from "../../menu.types";
import { MenuNextUiVariants } from "./next-ui.variants";

export function MenuNextUiAdapter({
  classNames,
  children,
  items,
  closeOnSelect = true,
  onAction,
  selectedIds,
  onSelect,
  placement,
}: MenuPort) {
  const slots = MenuNextUiVariants();

  function onSelectionChange(values: SharedSelection) {
    if (values === "all") {
      return onSelect?.(
        items.map(item => item.id),
        items
      );
    }

    const valuesArray = Array.from(values).map(val => val.toString());

    onSelect?.(
      valuesArray,
      items.filter(item => valuesArray.includes(item.id))
    );
  }

  return (
    <Dropdown
      classNames={{
        base: cn(slots.base(), classNames?.base),
        content: cn(slots.content(), classNames?.content),
      }}
      placement={placement}
    >
      <DropdownTrigger>
        <div>{children}</div>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={closeOnSelect}
        aria-label="Dynamic Actions"
        hideSelectedIcon={true}
        items={items}
        className={"gap-0 p-0"}
        classNames={{ list: "gap-0" }}
        onAction={key => onAction?.(key.toString())}
        selectedKeys={selectedIds}
        onSelectionChange={onSelectionChange}
      >
        {item => (
          <DropdownItem key={item.id} className={"!bg-transparent p-0"}>
            <MenuItem {...item} isSelected={selectedIds?.includes(item.id)} />
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

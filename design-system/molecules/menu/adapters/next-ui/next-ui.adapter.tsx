import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

import { MenuItem } from "@/design-system/molecules/menu-item";

import { cn } from "@/shared/helpers/cn";

import { MenuPort } from "../../menu.types";
import { MenuNextUiVariants } from "./next-ui.variants";

export function MenuNextUiAdapter({ classNames, children, items, ...props }: MenuPort) {
  const slots = MenuNextUiVariants();

  return (
    <Dropdown
      classNames={{
        base: cn(slots.base(), classNames?.base),
        content: cn(slots.content(), classNames?.content),
      }}
    >
      <DropdownTrigger>
        <div>{children}</div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items} className={"gap-0 p-0"} classNames={{ list: "gap-0" }}>
        {item => (
          <DropdownItem key={item.id} className={"!bg-transparent p-0"}>
            <MenuItem {...item} />
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

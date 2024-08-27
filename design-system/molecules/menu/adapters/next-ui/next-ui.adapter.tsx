import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";

import { MenuItemPort, MenuPort } from "../../menu.types";
import { MenuNextUiVariants } from "./next-ui.variants";

export function MenuItemNextUiAdapter({ id, label }: MenuItemPort) {
  return <div className={"w-full bg-red-500"}>{label}</div>;
}

export function MenuNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  children,
  items,
  ...props
}: MenuPort<C>) {
  const Component = as || "div";
  const slots = MenuNextUiVariants();

  return (
    <Dropdown
      classNames={{
        base: cn(slots.base(), classNames?.base),
        content: cn(slots.content(), classNames?.content),
      }}
    >
      <DropdownTrigger>
        <Component {...htmlProps}>{children}</Component>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items} className={"gap-0 p-0"} classNames={{ list: "gap-0" }}>
        {item => (
          <DropdownItem key={item.id} color={item.id === "delete" ? "danger" : "default"} className={"p-0"}>
            <MenuItemNextUiAdapter {...item} />
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

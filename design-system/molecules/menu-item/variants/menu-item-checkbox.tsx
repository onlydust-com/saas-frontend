import { Checkbox } from "@/design-system/atoms/checkbox";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuItemDefaultAdapter } from "@/design-system/molecules/menu-item/adapters/default/default.adapter";

import { MenuItemCheckboxPort, MenuItemPort } from "../menu-item.types";

export function MenuItemCheckbox<T = string>({ isSelected, ...props }: MenuItemCheckboxPort<T>) {
  return withComponentAdapter<MenuItemPort<T>>(MenuItemDefaultAdapter)({
    ...props,
    startContent: (
      // isSelected is extracted from props so the checkbox behaves correctly and so we don't have the default menu item styles when selected
      <Checkbox value={isSelected} isDisabled={props.isDisabled} classNames={{ base: "pointer-events-none" }} />
    ),
    showIndicatorOnSelected: false,
  });
}

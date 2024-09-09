import { Checkbox } from "@/design-system/atoms/checkbox";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuItemDefaultAdapter } from "@/design-system/molecules/menu-item/adapters/default/default.adapter";

import { MenuItemCheckboxPort, MenuItemPort } from "../menu-item.types";

export function MenuItemCheckbox({ ...props }: MenuItemCheckboxPort) {
  return withComponentAdapter<MenuItemPort>(MenuItemDefaultAdapter)({
    ...props,
    startContent: (
      <Checkbox value={props.isSelected} isDisabled={props.isDisabled} classNames={{ base: "pointer-events-none" }} />
    ),
    showIndicatorOnSelected: false,
  });
}

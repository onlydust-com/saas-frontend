import { Checkbox } from "@/design-system/atoms/checkbox";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { MenuItemNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { MenuItemCheckboxPort, MenuItemPort } from "../menu-item.types";

export function MenuItemCheckbox({ ...props }: MenuItemCheckboxPort) {
  return withComponentAdapter<MenuItemPort>(MenuItemNextUiAdapter)({
    ...props,
    startContent: (
      <Checkbox value={props.isSelected} isDisabled={props.isDisabled} classNames={{ base: "pointer-events-none" }} />
    ),
    showIndicatorOnSelected: false,
  });
}

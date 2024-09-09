import { RadioGroup } from "@/design-system/atoms/radio-group";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuItemDefaultAdapter } from "@/design-system/molecules/menu-item/adapters/default/default.adapter";

import { MenuItemPort, MenuItemRadioPort } from "../menu-item.types";

export function MenuItemRadio({ ...props }: MenuItemRadioPort) {
  return withComponentAdapter<MenuItemPort>(MenuItemDefaultAdapter)({
    ...props,
    startContent: (
      <RadioGroup
        value={props.isSelected ? "a" : ""}
        items={[{ value: "a" }]}
        isDisabled={props.isDisabled}
        classNames={{ base: "pointer-events-none" }}
      />
    ),
    showIndicatorOnSelected: false,
  });
}

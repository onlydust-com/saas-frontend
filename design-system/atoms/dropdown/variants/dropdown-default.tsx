import { ElementType } from "react";

import { DropdownNextUiAdapter } from "@/design-system/atoms/dropdown/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { DropdownPort } from "../dropdown.types";

export function Dropdown<C extends ElementType = "div">(props: DropdownPort<C>) {
  return withComponentAdapter<DropdownPort<C>>(DropdownNextUiAdapter)(props);
}

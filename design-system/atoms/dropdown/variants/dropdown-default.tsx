import { DropdownNextUiAdapter } from "@/design-system/atoms/dropdown/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { DropdownPort } from "../dropdown.types";

export function Dropdown(props: DropdownPort) {
  return withComponentAdapter<DropdownPort>(DropdownNextUiAdapter)(props);
}

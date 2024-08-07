import { CheckboxNextUiAdapter } from "@/design-system/atoms/checkbox/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CheckboxPort } from "../checkbox.types";

export function Checkbox(props: CheckboxPort) {
  return withComponentAdapter<CheckboxPort>(CheckboxNextUiAdapter)(props);
}

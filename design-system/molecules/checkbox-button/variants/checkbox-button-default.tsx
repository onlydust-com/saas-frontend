import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CheckboxButtonDefaultAdapter } from "../adapters/default/default.adapter";
import { CheckboxButtonPort } from "../checkbox-button.types";

export function CheckboxButton(props: CheckboxButtonPort) {
  return withComponentAdapter<CheckboxButtonPort>(CheckboxButtonDefaultAdapter)(props);
}

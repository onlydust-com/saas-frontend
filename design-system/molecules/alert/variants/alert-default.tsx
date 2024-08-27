import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AlertDefaultAdapter } from "../adapters/default/default.adapter";
import { AlertPort } from "../alert.types";

export function Alert(props: AlertPort) {
  return withComponentAdapter<AlertPort>(AlertDefaultAdapter)(props);
}

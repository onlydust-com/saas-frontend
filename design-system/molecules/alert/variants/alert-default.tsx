import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AlertSonnerAdapter, alertSonnerAdapter } from "../adapters/sonner/sonner.adapter";
import { AlertPort } from "../alert.types";

export function Alert(props: AlertPort) {
  return withComponentAdapter<AlertPort>(AlertSonnerAdapter)(props);
}

export { alertSonnerAdapter as alert };

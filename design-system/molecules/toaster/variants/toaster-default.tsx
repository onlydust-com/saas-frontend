import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ToasterSonnerAdapter, toastSonnerAdapter } from "../adapters/sonner/sonner.adapter";
import { ToasterPort } from "../toaster.types";

export function Toaster(props: ToasterPort) {
  return withComponentAdapter<ToasterPort>(ToasterSonnerAdapter)(props);
}

export { toastSonnerAdapter as toast };

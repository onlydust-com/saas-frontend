import { ToasterPort } from "@/design-system/atoms/toaster";
import { ToasterSonnerAdapter, toastSonnerAdapter } from "@/design-system/atoms/toaster/adapters/sonner/sonner.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

export function Toaster(props: ToasterPort) {
  return withComponentAdapter<ToasterPort>(ToasterSonnerAdapter)(props);
}

export { toastSonnerAdapter as toast };

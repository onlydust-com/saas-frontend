import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { IconRemixIconAdapter } from "../adapters/remix-icon/remix-icon.adapter";
import { RemixIconPort } from "../icon.types";

export function RemixIcon(props: RemixIconPort) {
  return withComponentAdapter<RemixIconPort>(IconRemixIconAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { IconRemixIconAdapter } from "../adapters/remix-icon/remix-icon.adapter";
import { IconPort } from "../icon.types";

export function Icon(props: IconPort) {
  return withComponentAdapter<IconPort>(IconRemixIconAdapter)(props);
}

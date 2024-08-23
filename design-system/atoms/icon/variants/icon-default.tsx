import { IconLucideAdapter } from "@/design-system/atoms/icon/adapters/lucide/lucide.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { IconPort } from "../icon.types";

export function Icon(props: IconPort) {
  return withComponentAdapter<IconPort>(IconLucideAdapter)(props);
}

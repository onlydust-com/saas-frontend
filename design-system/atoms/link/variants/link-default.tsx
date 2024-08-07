import { LinkDefaultAdapter } from "@/design-system/atoms/link/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { LinkPort } from "../link.types";

export function Link(props: LinkPort) {
  return withComponentAdapter<LinkPort>(LinkDefaultAdapter)(props);
}

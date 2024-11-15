import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TimelineDefaultAdapter } from "../adapters/default/default.adapter";

import { TimelinePort } from "../timeline.types";

export function Timeline<C extends ElementType = "div">(
  props: TimelinePort<C>,
) {
  return withComponentAdapter<TimelinePort<C>>(TimelineDefaultAdapter)(props);
}

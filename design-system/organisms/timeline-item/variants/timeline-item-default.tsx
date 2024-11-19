import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TimelineItemDefaultAdapter } from "../adapters/default/default.adapter";

import { TimelineItemPort } from "../timeline-item.types";

export function TimelineItem<C extends ElementType = "div">(
  props: TimelineItemPort<C>,
) {
  return withComponentAdapter<TimelineItemPort<C>>(TimelineItemDefaultAdapter)(
    props,
  );
}

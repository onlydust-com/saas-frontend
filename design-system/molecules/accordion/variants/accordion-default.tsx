import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { isAccodionSingle } from "@/design-system/molecules/accordion/accordion.utils";
import { AccordionSingle } from "@/design-system/molecules/accordion/variants/accordion-single";

import { AccordionPort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function Accordion(props: AccordionPort) {
  if (isAccodionSingle(props)) {
    return <AccordionSingle {...props}>{props.children}</AccordionSingle>;
  }

  return withComponentAdapter<AccordionPort>(AccordionNextUiAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { isAccordionSingle } from "@/design-system/molecules/accordion/accordion.utils";
import { AccordionSingle } from "@/design-system/molecules/accordion/variants/accordion-single";

import { AccordionMultiplePort, AccordionPort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function Accordion(props: AccordionPort) {
  if (isAccordionSingle(props)) {
    return <AccordionSingle {...props}>{props.children}</AccordionSingle>;
  }

  return withComponentAdapter<AccordionMultiplePort>(AccordionNextUiAdapter)(props);
}

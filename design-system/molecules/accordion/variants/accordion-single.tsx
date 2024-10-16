import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AccordionMultiplePort, AccordionSinglePort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function AccordionSingle(props: AccordionSinglePort) {
  const { classNames, defaultSelected, controlled, ...item } = props;

  return withComponentAdapter<AccordionMultiplePort>(AccordionNextUiAdapter)({
    classNames,
    defaultSelected,
    multiple: false,
    controlled,
    items: [
      {
        ...item,
        content: item.children,
      },
    ],
  });
}

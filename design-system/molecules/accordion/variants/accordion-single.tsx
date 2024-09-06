import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AccordionPort, AccordionSinglePort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function AccordionSingle(props: AccordionSinglePort) {
  const { classNames, defaultSelected, ...item } = props;

  return withComponentAdapter<AccordionPort>(AccordionNextUiAdapter)({
    classNames,
    defaultSelected,
    multiple: false,
    items: [
      {
        ...item,
        content: item.children,
      },
    ],
  });
}

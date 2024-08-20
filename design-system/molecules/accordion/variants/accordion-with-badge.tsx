import { Badge } from "@/design-system/atoms/badge";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { AccordionItemProps, AccordionWithBadgePort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function AccordionWithBadge({ items, ...props }: AccordionWithBadgePort) {
  const itemsWithBadge: AccordionItemProps[] = items.map(({ badgeProps, ...item }) => ({
    ...item,
    endContent: badgeProps ? <Badge style="outline" size="s" {...badgeProps} /> : undefined,
  }));

  return withComponentAdapter<AccordionWithBadgePort>(AccordionNextUiAdapter)({ ...props, items: itemsWithBadge });
}

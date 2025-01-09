import { PropsWithChildren } from "react";

import { AccordionSinglePort } from "@/design-system/molecules/accordion";

export interface PageDetailCommonBlockProps extends PropsWithChildren {
  accordionProps?: Omit<AccordionSinglePort, "children">;
}

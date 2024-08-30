import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { PageHeaderDefaultAdapter } from "../adapters/default/default.adapter";
import { PageHeaderPort } from "../page-header.types";

export function PageHeader<C extends ElementType = "div">(props: PageHeaderPort<C>) {
  return withComponentAdapter<PageHeaderPort<C>>(PageHeaderDefaultAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { BreadcrumbsDefaultAdapter } from "../adapters/default/default.adapter";
import { BreadcrumbsPort } from "../breadcrumbs.types";

export function Breadcrumbs(props: BreadcrumbsPort) {
  return withComponentAdapter(BreadcrumbsDefaultAdapter)(props);
}

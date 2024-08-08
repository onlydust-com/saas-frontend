import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { PaginationDefaultAdapter } from "@/design-system/molecules/pagination/adapters/default/default.adapter";

import { PaginationPort } from "../pagination.types";

export function Pagination<C extends ElementType = "div">(props: PaginationPort<C>) {
  return withComponentAdapter<PaginationPort<C>>(PaginationDefaultAdapter)(props);
}

import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { SelectDefaultAdapter } from "../adapters/default/default.adapter";
import { SelectPort } from "../select.types";

export function Select<C extends ElementType = "div">(props: SelectPort<C>) {
  return withComponentAdapter<SelectPort<C>>(SelectDefaultAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { SelectDefaultAdapter } from "../adapters/default/default.adapter";
import { SelectPort } from "../select.types";

export function Select<T = string>(props: SelectPort<T>) {
  return withComponentAdapter<SelectPort<T>>(SelectDefaultAdapter)(props);
}

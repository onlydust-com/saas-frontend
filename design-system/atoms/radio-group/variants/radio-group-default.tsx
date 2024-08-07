import { ElementType } from "react";

import { RadioGroupPort } from "@/design-system/atoms/radio-group";
import { RadioGroupNextUiAdapter } from "@/design-system/atoms/radio-group/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

export function RadioGroup<V extends string, C extends ElementType = "div">(props: RadioGroupPort<V, C>) {
  return withComponentAdapter<RadioGroupPort<V, C>>(RadioGroupNextUiAdapter)(props);
}

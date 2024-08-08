import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { RadioGroupButtonPort } from "@/design-system/molecules/radio-button-group";
import { RadioButtonGroupDefaultAdapter } from "@/design-system/molecules/radio-button-group/adapters/default/default.adapter";

export function RadioButtonGroup<V extends string>(props: RadioGroupButtonPort<V>) {
  return withComponentAdapter<RadioGroupButtonPort<V>>(RadioButtonGroupDefaultAdapter)(props);
}

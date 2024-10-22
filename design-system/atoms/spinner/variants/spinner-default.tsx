import { SpinnerNextUiAdapter } from "@/design-system/atoms/spinner/adapters/nextui/nextui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { SpinnerPort } from "../spinner.types";

export function Spinner(props: SpinnerPort) {
  return withComponentAdapter<SpinnerPort>(SpinnerNextUiAdapter)(props);
}

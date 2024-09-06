import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ProgressBarNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { ProgressBarPort } from "../progress-bar.types";

export function ProgressBar(props: ProgressBarPort) {
  return withComponentAdapter<ProgressBarPort>(ProgressBarNextUiAdapter)(props);
}

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { FieldContainerDefaultAdapter } from "../adapters/default/default.adapter";
import { FieldContainerPort } from "../field-container.types";

export function FieldContainer(props: FieldContainerPort) {
  return withComponentAdapter<FieldContainerPort>(FieldContainerDefaultAdapter)(props);
}

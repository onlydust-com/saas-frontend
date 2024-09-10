import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { FieldContainerDefaultAdapter } from "../adapters/default/default.adapter";

import { FieldContainerPort } from "../field-container.types";

export function FieldContainer<C extends ElementType = "div">(
  props: FieldContainerPort<C>,
) {
  return withComponentAdapter<FieldContainerPort<C>>(
    FieldContainerDefaultAdapter,
  )(props);
}

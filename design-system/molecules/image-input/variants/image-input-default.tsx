import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ImageInputDefaultAdapter } from "../adapters/default/default.adapter";
import { ImageInputPort } from "../image-input.types";

export function ImageInput<C extends ElementType = "div">(props: ImageInputPort<C>) {
  return withComponentAdapter<ImageInputPort<C>>(ImageInputDefaultAdapter)(props);
}

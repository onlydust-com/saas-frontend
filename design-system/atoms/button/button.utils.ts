import { ElementType } from "react";

import { ButtonDefaultPort, ButtonTextPort } from "@/design-system/atoms/button/button.types";

export function isButtonText<C extends ElementType>(tag: ButtonDefaultPort<C>): tag is ButtonTextPort<C> {
  return (tag as ButtonTextPort<C>).isTextButton;
}

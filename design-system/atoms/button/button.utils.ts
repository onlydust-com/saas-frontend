import { ElementType } from "react";

import { ButtonDefaultPort, ButtonSolidPort, ButtonTextPort } from "@/design-system/atoms/button/button.types";

export function isButtonText<C extends ElementType>(tag: ButtonDefaultPort<C>): tag is ButtonTextPort<C> {
  return (tag as ButtonTextPort<C>).isTextButton;
}

export function isButtonSolid<C extends ElementType>(tag: ButtonDefaultPort<C>): tag is ButtonSolidPort<C> {
  return (tag as ButtonSolidPort<C>).isTextButton === undefined;
}

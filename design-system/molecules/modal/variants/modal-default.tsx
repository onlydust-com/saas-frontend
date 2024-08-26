import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { ModalNextUiAdapter } from "@/design-system/molecules/modal/adapters/next-ui/next-ui.adapter";

import { cn } from "@/shared/helpers/cn";

import { ModalPort } from "../modal.types";

export function Modal<C extends ElementType = "div">({ titleProps, closeButtonProps, ...props }: ModalPort<C>) {
  const { modal, footer, ...restClassNames } = props.classNames ?? {};

  return withComponentAdapter<ModalPort<C>>(ModalNextUiAdapter)({
    ...props,
    classNames: {
      modal: cn("border border-container-stroke-separator", modal),
      footer: cn("border-t border-container-stroke-separator", footer),
      ...restClassNames,
    },
    titleProps: {
      variant: "brand",
      size: "xl",
      as: "h6",
      ...titleProps,
    },
    closeButtonProps: {
      variant: "secondary",
      size: "l",
      ...closeButtonProps,
    },
  });
}

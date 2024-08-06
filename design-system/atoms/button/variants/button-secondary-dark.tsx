import { ElementType } from "react";

import { ButtonDefaultAdapter } from "@/design-system/atoms/button/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { ButtonPort } from "../button.types";

export function ButtonSecondaryDark<C extends ElementType = "button">(props: ButtonPort<C>) {
  return withComponentAdapter<ButtonPort<C>>(ButtonDefaultAdapter)({
    ...props,
    classNames: {
      ...(props.classNames || {}),
      base: cn(
        "bg-transparent border-1 border-interactions-black-default data-[loading=true]:border-interactions-black-active data-[disabled=true]:bg-interactions-black-disabled",
        "hover:border-interactions-black-hover text-text-4",
        props.classNames?.base
      ),
      label: cn("text-text-4", props.classNames?.label),
      startIcon: cn("text-text-4", props.classNames?.startIcon),
      endIcon: cn("text-text-4", props.classNames?.endIcon),
      loaderContainer: cn("bg-transparent", props.classNames?.loaderContainer),
      spinnerCircle: cn("border-b-text-4", props.classNames?.spinnerCircle),
    },
  });
}

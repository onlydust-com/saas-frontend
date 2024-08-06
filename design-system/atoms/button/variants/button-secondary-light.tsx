import { ElementType } from "react";

import { ButtonDefaultAdapter } from "@/design-system/atoms/button/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { ButtonPort } from "../button.types";

export function ButtonSecondaryLight<C extends ElementType = "button">(props: ButtonPort<C>) {
  return withComponentAdapter<ButtonPort<C>>(ButtonDefaultAdapter)({
    ...props,
    classNames: {
      ...(props.classNames || {}),
      base: cn(
        "bg-transparent border-1 border-container-stroke-separator data-[loading=true]:border-interactions-white-active data-[disabled=true]:bg-interactions-white-disabled",
        "hover:border-interactions-white-hover",
        props.classNames?.base
      ),
      loaderContainer: cn("bg-transparent", props.classNames?.loaderContainer),
    },
  });
}

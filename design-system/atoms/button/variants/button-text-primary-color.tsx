import { ElementType } from "react";
import { tv } from "tailwind-variants";

import { ButtonDefaultAdapter } from "@/design-system/atoms/button/adapters/default/default.adapter";
import { ButtonDefaultVariants } from "@/design-system/atoms/button/adapters/default/default.variants";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { ButtonTextPort } from "../button.types";

const ButtonTextPrimaryColorVariants = tv({
  extend: ButtonDefaultVariants,
  slots: {
    base: "border-0 outline-none hover:underline hover:underline-offset-2",
    label: "",
  },
  variants: {
    size: {
      xs: {
        base: "!rounded-xxs !px-px !py-px",
        content: "gap-xs",
      },
      md: {
        base: "!rounded-xs !px-px !py-px",
        content: "gap-md",
      },
      lg: {
        base: "!rounded-xs !px-px !py-px",
        content: "gap-2md",
      },
    },
    underline: {
      true: {
        base: "underline underline-offset-2",
      },
    },
    variant: {
      primary: {
        base: [
          "text-components-textbutton-primary-fg",
          "data-[hover=true]:text-components-textbutton-primary-fg-hover hover:text-components-textbutton-primary-fg-hover",
          "data-[focus-visible=true]:effect-ring-brand-spaced focus-visible:effect-ring-brand-spaced",
        ],
      },
      secondary: {
        base: [
          "text-components-textbutton-secondary-fg",
          "data-[hover=true]:text-components-textbutton-secondary-fg-hover hover:text-components-textbutton-secondary-fg-hover",
          "data-[focus-visible=true]:effect-ring-brand-spaced focus-visible:effect-ring-brand-spaced",
        ],
      },
      tertiary: {
        base: "",
      },
    },
    isDisabled: {
      true: {
        base: "text-typography-disabled",
        startIcon: "text-foreground-disabled",
        endIcon: "text-foreground-disabled",
        content: "text-foreground-disabled",
        label: "text-typography-disabled",
      },
    },
  },
});

export function ButtonTextPrimaryColor<C extends ElementType = "button">(props: ButtonTextPort<C>) {
  const { isDisabled, iconOnly, size, canInteract, variant = "primary", underline } = props;
  const slotsDefault = ButtonTextPrimaryColorVariants({
    isDisabled,
    iconOnly,
    size,
    canInteract,
    variant,
    underline,
  });

  return withComponentAdapter<ButtonTextPort<C>>(ButtonDefaultAdapter)({
    ...props,
    variant,
    size,
    classNames: {
      ...(props.classNames || {}),
      base: cn(slotsDefault.base(), props.classNames?.base),
    },
  });
}

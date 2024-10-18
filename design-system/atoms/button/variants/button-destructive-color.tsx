import { ElementType } from "react";
import { tv } from "tailwind-variants";

import { ButtonDefaultAdapter } from "@/design-system/atoms/button/adapters/default/default.adapter";
import { ButtonDefaultVariants } from "@/design-system/atoms/button/adapters/default/default.variants";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { ButtonSolidPort } from "../button.types";

const ButtonDestructiveColortVariants = tv({
  extend: ButtonDefaultVariants,
  slots: {
    base: "outline-none",
  },
  variants: {
    variant: {
      primary: {
        base: [
          "bg-components-buttons-destructive-primary-bg",
          "text-components-buttons-destructive-primary-fg",
          "effect-box-shadow-xs",
          "data-[hover=true]:bg-components-buttons-destructive-primary-bg-hover hover:bg-components-buttons-destructive-primary-bg-hover",
          "data-[focus-visible=true]:effect-ring-error-spaced focus-visible:effect-ring-error-spaced",
        ],
        spinnerCircle: "border-b-components-buttons-destructive-primary-fg",
      },
      secondary: {
        base: [
          "border-1 border-components-buttons-destructive-secondary-border",
          "bg-components-buttons-destructive-secondary-bg",
          "text-components-buttons-destructive-secondary-fg",
          "effect-box-shadow-xs",
          "data-[hover=true]:bg-components-buttons-destructive-secondary-bg-hover hover:bg-components-buttons-destructive-secondary-bg-hover",
          "data-[focus-visible=true]:effect-ring-error-spaced focus-visible:effect-ring-error-spaced",
        ],
        spinnerCircle: "border-b-components-buttons-destructive-secondary-fg",
      },
      tertiary: {
        base: [
          "bg-components-buttons-destructive-tertiary-bg",
          "text-components-buttons-destructive-tertiary-fg",
          "data-[hover=true]:bg-components-buttons-destructive-tertiary-bg-hover hover:bg-components-buttons-destructive-tertiary-bg-hover",
          "data-[focus-visible=true]:effect-ring-error-spaced focus-visible:effect-ring-error-spaced",
        ],
        spinnerCircle: "border-b-components-buttons-destructive-tertiary-fg",
      },
    },
    isDisabled: {
      true: {
        base: "bg-background-disabled text-typography-disabled",
        startIcon: "text-foreground-disabled",
        endIcon: "text-foreground-disabled",
        content: "text-foreground-disabled",
        label: "text-typography-disabled",
      },
    },
  },
});

export function ButtonDestructiveColor<C extends ElementType = "button">(props: ButtonSolidPort<C>) {
  const { isDisabled, iconOnly, size, canInteract, variant = "primary" } = props;
  const slotsDefault = ButtonDestructiveColortVariants({ isDisabled, iconOnly, size, canInteract, variant });

  return withComponentAdapter<ButtonSolidPort<C>>(ButtonDefaultAdapter)({
    ...props,
    variant,
    classNames: {
      ...(props.classNames || {}),
      base: cn(slotsDefault.base(), props.classNames?.base),
      spinnerCircle: cn(slotsDefault.spinnerCircle(), props.classNames?.spinnerCircle),
    },
  });
}

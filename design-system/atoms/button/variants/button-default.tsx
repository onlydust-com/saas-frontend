import { ElementType } from "react";

import { isButtonText } from "@/design-system/atoms/button/button.utils";
import { ButtonDestructiveColor } from "@/design-system/atoms/button/variants/button-destructive-color";
import { ButtonPrimaryColor } from "@/design-system/atoms/button/variants/button-primary-color";
import { ButtonTextPrimaryColor } from "@/design-system/atoms/button/variants/button-text-primary-color";

import { ButtonPort } from "../button.types";

export function Button<C extends ElementType = "button">(props: ButtonPort<C>) {
  if (isButtonText(props)) {
    switch (props.theme) {
      case "primary":
      default:
        return <ButtonTextPrimaryColor {...props} />;
    }
  }

  switch (props.theme) {
    case "destructive":
      return <ButtonDestructiveColor {...props} />;
    case "primary":
    default:
      return <ButtonPrimaryColor {...props} />;
  }
}

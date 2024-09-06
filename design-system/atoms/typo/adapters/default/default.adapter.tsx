import { ElementType } from "react";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TypoPort } from "../../typo.types";
import { TypoDefaultVariants } from "./default.variants";

export function TypoDefaultAdapter<C extends ElementType = "span">({
  as,
  htmlProps,
  classNames,
  translate,
  children,
  canHover = false,
  ...props
}: TypoPort<C>) {
  const Component = as || "span";
  const { weight, variant, size, color } = props;
  const slots = TypoDefaultVariants({ weight, variant, size, color, canHover });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {translate ? <Translate {...translate} /> : children}
    </Component>
  );
}

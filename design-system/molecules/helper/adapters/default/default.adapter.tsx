import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { HelperPort } from "../../helper.types";
import { HelperDefaultVariants } from "./default.variants";

export function HelperDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  title,
  avatar,
  text,
  endContent,
  startContent,
  startButton,
  endButton,
  ...props
}: HelperPort<C>) {
  const Component = as || "div";
  const { container, size, layout } = props;
  const slots = HelperDefaultVariants({ container, size, layout });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {startContent}
      <Avatar {...avatar} size={"xl"} shape={"square"} />
      <div className="flex flex-col items-start justify-start gap-1">
        <Typo {...title} size={"md"} variant={"heading"} />
        <Typo {...text} size={"sm"} />
      </div>
      <div className={cn(slots.endContainer(), classNames?.endContainer)}>
        <Button {...startButton} size={"md"} variant={"secondary"} />
        <Button {...endButton} size={"md"} variant={"secondary"} />
        {endContent}
      </div>
    </Component>
  );
}

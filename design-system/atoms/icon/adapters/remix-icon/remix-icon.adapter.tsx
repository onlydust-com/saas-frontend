import { cn } from "@/shared/helpers/cn";

import { IconPort } from "../../icon.types";
import { IconRemixIconVariants } from "./remix-icon.variants";

export function IconRemixIconAdapter({ classNames, name, size, color, ...props }: IconPort) {
  const { base } = IconRemixIconVariants();

  return (
    <span className={cn(base(), classNames?.base)} {...props}>
      <i
        className={cn(name)}
        style={{
          fontSize: `${size}px`,
          lineHeight: 1,
          color,
        }}
      />
    </span>
  );
}

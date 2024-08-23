import { cn } from "@/shared/helpers/cn";

import { RemixIconPort } from "../../icon.types";
import { IconRemixIconVariants } from "./remix-icon.variants";

export function IconRemixIconAdapter({ classNames, name, size, color, ...props }: RemixIconPort) {
  const { base } = IconRemixIconVariants();

  return (
    <span className={cn(base(), classNames?.base)} {...props}>
      <i
        className={name}
        style={{
          fontSize: `${size}px`,
          lineHeight: 1,
          color,
        }}
      />
    </span>
  );
}

import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AvatarLabelSinglePort } from "../../avatar-label-single.types";
import { AvatarLabelSingleDefaultVariants } from "./default.variants";

export function AvatarLabelSingleDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  avatar,
  title,
  description,
  size = "md",
  shape,
  truncate,
}: AvatarLabelSinglePort<C>) {
  const Component = as || "div";
  const slots = AvatarLabelSingleDefaultVariants({ truncate });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <Avatar src={avatar.src} alt={avatar.alt} fallback={avatar.fallback} size={size} shape={shape} />

      <div className="flex flex-col">
        {title ? (
          <Typo
            size="sm"
            weight="medium"
            color="secondary"
            classNames={{
              base: slots.title(),
            }}
            {...title}
          />
        ) : null}

        {description ? (
          <Typo
            size={size === "md" ? "xs" : "sm"}
            color="tertiary"
            classNames={{
              base: slots.description(),
            }}
            {...description}
          />
        ) : null}
      </div>
    </Component>
  );
}

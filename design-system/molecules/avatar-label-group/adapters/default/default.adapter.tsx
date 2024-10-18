import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { cn } from "@/shared/helpers/cn";

import { AvatarLabelGroupPort } from "../../avatar-label-group.types";
import { AvatarLabelGroupDefaultVariants } from "./default.variants";

export function AvatarLabelGroupDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  avatars,
  title,
  description,
  size = "md",
  shape,
  quantity,
  truncate,
}: AvatarLabelGroupPort<C>) {
  const Component = as || "div";

  const slots = AvatarLabelGroupDefaultVariants({ truncate });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {avatars.length === 1 ? (
        <Avatar src={avatars[0].src} size={size} shape={shape} />
      ) : (
        <AvatarGroup avatars={avatars} size={size} outsideBorder quantity={quantity} shape={shape} />
      )}

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

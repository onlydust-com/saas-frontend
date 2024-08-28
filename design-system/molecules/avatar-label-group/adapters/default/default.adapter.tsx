import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { getAvatarImageSize } from "@/design-system/molecules/avatar-label-group/avatar-label-group.utils";

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
  size,
  quantity,
}: AvatarLabelGroupPort<C>) {
  const Component = as || "div";

  const slots = AvatarLabelGroupDefaultVariants();

  const imageSize = getAvatarImageSize(size);

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {avatars.length === 1 ? (
        <Avatar src={avatars[0].src} size={size} />
      ) : (
        <AvatarGroup avatars={avatars} size={imageSize} outsideBorder quantity={quantity} />
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

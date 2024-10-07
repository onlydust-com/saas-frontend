import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";

import { cn } from "@/shared/helpers/cn";

import { AvatarGroupPort } from "../../avatar-group.types";
import { AvatarGroupDefaultVariants } from "./default.variants";

export function AvatarGroupDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  avatars,
  quantity,
  totalAvatarsCount,
  size,
  outsideBorder,
  shape,
}: AvatarGroupPort<C>) {
  const Component = as || "div";

  const slots = AvatarGroupDefaultVariants({ size, outsideBorder });

  const slicedAvatars = quantity ? avatars.slice(0, quantity) : avatars;
  const totalAvatars = totalAvatarsCount || avatars.length;

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {slicedAvatars.map((avatar, index) => (
        <Avatar
          key={`avatar-${index}`}
          src={avatar.src}
          size={size}
          shape={shape}
          classNames={{
            base: slots.image(),
          }}
        />
      ))}

      {quantity && (avatars.length > quantity || totalAvatars > avatars.length) ? (
        <Avatar
          name={`+${totalAvatars - quantity}`}
          size={size}
          shape={shape}
          classNames={{
            base: slots.image(),
          }}
        />
      ) : null}
    </Component>
  );
}

import { ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { cn } from "@/shared/helpers/cn";

import { AvatarGroupDescriptionPort } from "../../avatar-group-description.types";
import { AvatarGroupDescriptionDefaultVariants } from "./default.variants";

export function AvatarGroupDescriptionDefaultAdapter<C extends ElementType = "div">({
  avatarGroupProps,
  labelProps,
  descriptionProps,
  classNames,
}: AvatarGroupDescriptionPort<C>) {
  const slots = AvatarGroupDescriptionDefaultVariants();

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <AvatarGroup {...avatarGroupProps} size={"m"} />
      <div className={"grid place-content-center"}>
        <Typo {...labelProps} size={"xs"} weight={"medium"} color={"text-1"} />
        {descriptionProps ? <Typo {...descriptionProps} size={"xxs"} weight={"regular"} color={"text-2"} /> : null}
      </div>
    </div>
  );
}

import { Avatar } from "@/design-system/atoms/avatar";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AvatarDescriptionPort } from "../../avatar-description.types";
import { AvatarDescriptionDefaultVariants } from "./default.variants";

export function AvatarDescriptionDefaultAdapter({
  avatarProps,
  labelProps,
  descriptionProps,
  classNames,
}: AvatarDescriptionPort) {
  const slots = AvatarDescriptionDefaultVariants();

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Avatar {...avatarProps} size={"m"} />
      <div className={"grid place-content-center"}>
        <Typo
          {...labelProps}
          size={"xs"}
          weight={"medium"}
          color={"text-1"}
          classNames={{ base: cn(slots.label(), classNames?.label) }}
        />
        {descriptionProps ? <Typo {...descriptionProps} size={"xxs"} weight={"regular"} color={"text-2"} /> : null}
      </div>
    </div>
  );
}

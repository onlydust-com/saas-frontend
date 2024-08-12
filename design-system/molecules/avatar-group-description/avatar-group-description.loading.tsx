import { ComponentProps } from "react";

import { AvatarLoading } from "@/design-system/atoms/avatar/avatar.loading";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { AvatarDescriptionDefaultVariants } from "@/design-system/molecules/avatar-description/adapters/default/default.variants";
import { AvatarDescriptionPort } from "@/design-system/molecules/avatar-description/avatar-description.types";
import { AvatarGroupLoading } from "@/design-system/molecules/avatar-group";

import { cn } from "@/shared/helpers/cn";

export function AvatarGroupDescriptionLoading({
  avatarShape,
  classNames,
}: {
  avatarShape?: ComponentProps<typeof AvatarLoading>["shape"];
  classNames?: AvatarDescriptionPort["classNames"];
}) {
  const slots = AvatarDescriptionDefaultVariants();

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <AvatarGroupLoading size={"m"} shape={avatarShape} />
      <div className={"grid place-content-center content-between"}>
        <Skeleton classNames={{ base: "h-3 w-20" }} />
        <Skeleton classNames={{ base: "h-3 w-10" }} />
      </div>
    </div>
  );
}

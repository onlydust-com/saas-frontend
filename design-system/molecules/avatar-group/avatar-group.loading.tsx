import { ElementType } from "react";

import { AvatarLoading } from "@/design-system/atoms/avatar/avatar.loading";

import { AvatarGroupDefaultVariants } from "./adapters/default/default.variants";
import { AvatarGroupPort } from "./avatar-group.types";
import { getAvatarImageSize } from "./avatar-group.utils";

export function AvatarGroupLoading<C extends ElementType = "div">({ size }: Pick<AvatarGroupPort<C>, "size">) {
  const slots = AvatarGroupDefaultVariants({ size });

  const imageSize = getAvatarImageSize(size);

  return (
    <div className={slots.base()}>
      <AvatarLoading size={imageSize} />
      <AvatarLoading size={imageSize} />
      <AvatarLoading size={imageSize} />
    </div>
  );
}

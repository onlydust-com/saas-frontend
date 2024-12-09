import { ElementType } from "react";

import { AvatarLoading } from "@/design-system/atoms/avatar/avatar.loading";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { AvatarLabelSingleDefaultVariants } from "./adapters/default/default.variants";
import { AvatarLabelSinglePort } from "./avatar-label-single.types";

export function AvatarLabelSingleLoading<C extends ElementType = "div">({
  size,
}: Pick<AvatarLabelSinglePort<C>, "size">) {
  const slots = AvatarLabelSingleDefaultVariants();

  return (
    <div className={slots.base()}>
      <AvatarLoading size={size} />
      <Skeleton classNames={{ base: "h-5 w-full" }} />
    </div>
  );
}

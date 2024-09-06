import { ElementType } from "react";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

import { AvatarGroupLoading } from "../avatar-group";
import { AvatarLabelGroupDefaultVariants } from "./adapters/default/default.variants";
import { AvatarLabelGroupPort } from "./avatar-label-group.types";
import { getAvatarImageSize } from "./avatar-label-group.utils";

export function AvatarLabelGroupLoading<C extends ElementType = "div">({
  size,
}: Pick<AvatarLabelGroupPort<C>, "size">) {
  const slots = AvatarLabelGroupDefaultVariants();

  const imageSize = getAvatarImageSize(size);

  return (
    <div className={slots.base()}>
      <AvatarGroupLoading size={imageSize} />

      <div className="flex w-full flex-col">
        <Skeleton classNames={{ base: "h-5 w-1/2" }} />
        <Skeleton
          classNames={{
            base: cn("h-4", {
              "h-5": size === "lg",
            }),
          }}
        />
      </div>
    </div>
  );
}

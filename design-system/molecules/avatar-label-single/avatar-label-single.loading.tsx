import { ElementType } from "react";

import { AvatarLoading } from "@/design-system/atoms/avatar/avatar.loading";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { cn } from "@/shared/helpers/cn";

import { AvatarLabelSingleDefaultVariants } from "./adapters/default/default.variants";
import { AvatarLabelSinglePort } from "./avatar-label-single.types";

export function AvatarLabelSingleLoading<C extends ElementType = "div">({
  size,
}: Pick<AvatarLabelSinglePort<C>, "size">) {
  const slots = AvatarLabelSingleDefaultVariants();

  return (
    <div className={slots.base()}>
      <AvatarLoading size={size} />

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

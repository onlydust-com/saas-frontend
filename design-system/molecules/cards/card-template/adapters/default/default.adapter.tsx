import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CardTemplatePort } from "../../card-template.types";
import { CardTemplateDefaultVariants } from "./default.variants";

export function CardTemplateDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  avatarProps,
  titleProps,
  descriptionProps,
  actionSlot,
  contentSlot,
  size = "lg",
  ...props
}: CardTemplatePort<C>) {
  const slots = CardTemplateDefaultVariants();

  return (
    <Paper
      {...props}
      as={as || "div"}
      htmlProps={htmlProps}
      size={size}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
    >
      <div className="flex w-full flex-col gap-3 overflow-hidden">
        <div className="flex items-start justify-between gap-md">
          <div className={"flex gap-lg"}>
            {avatarProps ? <Avatar size="sm" {...avatarProps} /> : null}

            <div className={"grid"}>
              <Typo {...titleProps} size="sm" weight="medium" color={"primary"} />
              {descriptionProps ? <Typo {...descriptionProps} size="xs" color={"secondary"} /> : null}
            </div>
          </div>

          {actionSlot ? <div className="flex-1 overflow-hidden">{actionSlot}</div> : null}
        </div>

        {contentSlot ? <div>{contentSlot}</div> : null}
      </div>
    </Paper>
  );
}

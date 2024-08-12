import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Tag } from "@/design-system/atoms/tag";
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
  iconProps,
  descriptionProps,
  tags,
  endContent,
}: CardTemplatePort<C>) {
  const slots = CardTemplateDefaultVariants();

  return (
    <Paper
      as={as}
      container="interactions-black"
      size="s"
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      {...htmlProps}
    >
      <Avatar size="l" {...avatarProps} />

      <div className="flex w-full flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {titleProps && <Typo size="s" weight="medium" {...titleProps} />}

              {iconProps && <Icon {...iconProps} />}
            </div>

            {descriptionProps && <Typo size="xxs" color="text-2" {...descriptionProps} />}
          </div>

          {endContent}
        </div>

        {tags?.length && (
          <div className="flex w-full flex-wrap gap-1">
            {tags?.map((t, key) => <Tag key={key} color="grey" size="xs" style="outline" {...t} />)}
          </div>
        )}
      </div>
    </Paper>
  );
}

import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
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
  iconProps,
  descriptionProps,
  tags,
  endContent,
  onClick,
}: CardTemplatePort<C>) {
  const slots = CardTemplateDefaultVariants();

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      background={"secondary"}
      border={"primary"}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      onClick={onClick}
    >
      <Avatar {...avatarProps} size="s" />

      <div className="flex w-full flex-col gap-3 overflow-hidden">
        <div className="flex items-start justify-between gap-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {!!titleProps && <Typo {...titleProps} size="sm" weight="medium" color={"primary"} />}

              {!!iconProps && <Icon {...iconProps} />}
            </div>

            {descriptionProps && <Typo {...descriptionProps} size="xs" color={"secondary"} />}
          </div>

          {endContent}
        </div>

        {tags?.length ? (
          <div className="flex w-full flex-wrap gap-1">
            {tags.map((t, key) => (
              <Badge key={key} color="grey" size="xs" {...t} />
            ))}
          </div>
        ) : null}
      </div>
    </Paper>
  );
}

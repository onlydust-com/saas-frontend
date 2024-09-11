import { CodeXml, Folder, LucideIcon, User } from "lucide-react";
import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { BadgeList } from "@/shared/features/badge-list/badge-list";
import { cn } from "@/shared/helpers/cn";

import { CardProjectPort } from "../../card-project.types";
import { CardProjectDefaultVariants } from "./default.variants";

function ConditionalBadge({ count, icon }: { count?: string; icon: LucideIcon }) {
  return count ? (
    <Badge color="grey" size="xs" icon={{ component: icon }}>
      {count}
    </Badge>
  ) : null;
}

export function CardProjectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  title,
  description,
  logoUrl,
  languages = [],
  categories = [],
  projectCount,
  userCount,
  buttonProps,
  onClick,
  size = "xl",
  background = "secondary",
  border = "primary",
}: CardProjectPort<C>) {
  const slots = CardProjectDefaultVariants({ clickable: Boolean(onClick) });

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size={size}
      background={background}
      border={border}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      onClick={onClick}
    >
      <Avatar src={logoUrl} shape={"squared"} size="s" />

      <div className="flex w-full flex-col gap-3 overflow-hidden">
        <div className="flex items-start justify-between gap-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Typo size="sm" weight="medium" color={"primary"}>
                {title}
              </Typo>
            </div>
            <Typo size="xs" color={"secondary"}>
              {description}
            </Typo>
          </div>

          {buttonProps && <Button {...buttonProps} size="xs" variant="secondary" />}
        </div>

        <div className="flex w-full flex-wrap gap-1">
          <BadgeList items={languages} icon={CodeXml} label={{ token: "common:languages" }} />
          <BadgeList items={categories} icon={CodeXml} label={{ token: "common:categories" }} />
          <ConditionalBadge count={projectCount} icon={Folder} />
          <ConditionalBadge count={userCount} icon={User} />
        </div>
      </div>
    </Paper>
  );
}

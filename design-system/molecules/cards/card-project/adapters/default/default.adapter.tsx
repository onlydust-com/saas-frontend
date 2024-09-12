import { CodeXml, Folder, Tag, User } from "lucide-react";
import { ElementType } from "react";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { IconPort } from "@/design-system/atoms/icon";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { BadgeList } from "@/shared/features/badge-list/badge-list";

import { CardProjectPort } from "../../card-project.types";

function ConditionalBadge({ count, icon }: { count?: string; icon: IconPort["component"] }) {
  if (typeof count === "undefined") return null;

  return (
    <Badge color="grey" size="xs" icon={{ component: icon }}>
      {count}
    </Badge>
  );
}

export function CardProjectDefaultAdapter<C extends ElementType = "div">({
  title,
  description,
  logoUrl,
  languages = [],
  categories = [],
  projectCount,
  userCount,
  buttonProps,
  size = "xl",
  background = "secondary",
  border = "primary",
  ...props
}: CardProjectPort<C>) {
  return (
    <CardTemplate
      {...props}
      size={size}
      background={background}
      border={border}
      avatarProps={{ shape: "squared", src: logoUrl }}
      titleProps={{ children: title }}
      descriptionProps={{ children: description }}
      actionSlot={buttonProps ? <Button {...buttonProps} size="xs" variant="secondary" /> : null}
      contentSlot={
        <div className="flex w-full flex-wrap gap-1">
          <BadgeList items={languages} icon={CodeXml} label={{ token: "common:languages", count: languages?.length }} />
          <BadgeList items={categories} icon={Tag} label={{ token: "common:categories", count: categories?.length }} />
          <ConditionalBadge count={projectCount} icon={Folder} />
          <ConditionalBadge count={userCount} icon={User} />
        </div>
      }
    />
  );
}

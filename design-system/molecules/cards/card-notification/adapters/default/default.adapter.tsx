import { Bell } from "lucide-react";

import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { cn } from "@/shared/helpers/cn";

import { CardNotificationPort } from "../../card-notification.types";
import { CardNotificationDefaultVariants } from "./default.variants";

export function CardNotificationDefaultAdapter({
  classNames,
  titleProps,
  descriptionProps,
  hasRead,
  onClick,
}: CardNotificationPort) {
  const slots = CardNotificationDefaultVariants();

  return (
    <CardTemplate
      as={"button"}
      size={"lg"}
      background={"secondary"}
      border={"primary"}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      onClick={onClick}
      avatarProps={{
        iconProps: {
          component: Bell,
          size: "xs",
        },
        size: "sm",
        onlineIcon: !hasRead,
      }}
      titleProps={{
        ...titleProps,
        size: "sm",
        weight: "medium",
        color: "primary",
      }}
      descriptionProps={{
        ...descriptionProps,
        size: "xs",
        color: "secondary",
      }}
    />
  );
}

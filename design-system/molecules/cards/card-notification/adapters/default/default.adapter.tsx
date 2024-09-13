import { Bell } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CardNotificationPort } from "../../card-notification.types";
import { CardNotificationDefaultVariants } from "./default.variants";

export function CardNotificationDefaultAdapter({
  classNames,
  titleProps,
  descriptionProps,
  onClick,
}: CardNotificationPort) {
  const slots = CardNotificationDefaultVariants();

  return (
    <Paper
      as={"button"}
      size={"lg"}
      background={"secondary"}
      border={"primary"}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      onClick={onClick}
    >
      <div className="flex gap-lg">
        <Avatar
          iconProps={{
            component: Bell,
            size: "xs",
          }}
          size="s"
          onlineIcon
        />

        <div className={"grid"}>
          <Typo {...titleProps} size={"sm"} weight={"medium"} color={"primary"} />
          <Typo {...descriptionProps} size={"xs"} color={"secondary"} />
        </div>
      </div>
    </Paper>
  );
}

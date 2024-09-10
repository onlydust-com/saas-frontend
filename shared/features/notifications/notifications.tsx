import { X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CardNotification } from "@/design-system/molecules/cards/card-notification";

export function Notifications() {
  return (
    <Paper
      size={"3xl"}
      background={"primary-alt"}
      border={"primary"}
      classNames={{ base: "effect-box-shadow-xl grid gap-3xl" }}
    >
      <header className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-lg"}>
          <Typo
            variant={"heading"}
            size={"xs"}
            weight={"medium"}
            translate={{ token: "features:notifications.title" }}
          />
          <Button
            variant={"secondary"}
            size={"xs"}
            translate={{
              token: "features:notifications.markAllAsRead",
            }}
            // TODO handle click
          />
        </div>

        <Button
          variant={"tertiary"}
          size={"sm"}
          iconOnly
          startIcon={{ component: X }}
          // TODO handle close
        />
      </header>

      <div className={"grid gap-lg"}>
        <CardNotification
          titleProps={{
            children: "Notification title",
          }}
          descriptionProps={{
            children: "Notification description",
          }}
          onClick={() => alert("test")}
        />
      </div>
    </Paper>
  );
}

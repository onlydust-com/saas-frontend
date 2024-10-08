import { CircleDashed } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { TimelineProps } from "./timeline.types";

function TimelineItem(_: TimelineProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const BadgeIcon: IconPort = { component: CircleDashed };
  const Translate: TranslateProps = { token: "panels:contribution.timeline.items.prCreated" };
  const date = dateKernelPort.format(new Date(), "dd MMM yyyy");
  const showSeparator = true;
  return (
    <div className={"flex w-full items-center justify-between gap-1"}>
      <div className={"flex items-center justify-start gap-3"}>
        <div className={"flex flex-col items-center justify-start"}>
          <Badge size={"xs"} color={"brand"} shape={"squared"} iconOnly={true} icon={BadgeIcon} />
          {showSeparator && <div className={"h-3 w-px bg-components-badge-brand-border"} />}
        </div>
        <div className={"flex flex-col items-center justify-start"}>
          <Typo size={"xs"} weight={"medium"} as={"div"} translate={Translate} />
          {showSeparator && <div className={"h-3"} />}
        </div>
      </div>
      <div className={"flex flex-col items-center justify-start"}>
        <Typo color={"secondary"} size={"xs"} weight={"regular"} as={"div"}>
          {date ?? ""}
        </Typo>
        {showSeparator && <div className={"h-3"} />}
      </div>
    </div>
  );
}

export function Timeline(_: TimelineProps) {
  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contribution.timeline.title" }} />
      <div className={"flex flex-col"}>
        <TimelineItem />
        <TimelineItem />
        <TimelineItem />
      </div>
    </Paper>
  );
}

import { Loader, TriangleAlert } from "lucide-react";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Timeline as TimelineComponent, TimelinePort } from "@/design-system/organisms/timeline";

import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardTimelineProps } from "./reward-timeline.types";

export function RewardTimeline({ reward }: RewardTimelineProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const timelineItems: TimelinePort<AnyType>["items"] = useMemo(() => {
    const items: TimelinePort<AnyType>["items"] = [];

    if (reward.status !== "PENDING_REQUEST") {
      items.push({
        label: (
          <Translate
            token="panels:rewardDetail.timeline.verificationBlock.label"
            values={{ login: reward.from.login }}
          />
        ),
        endContent: dateKernelPort.format(new Date(), "dd MMM yyyy"),
        icon: { component: TriangleAlert },
        color: "warning",

        children: (
          <Paper background={"primary"} classNames={{ base: "flex flex-col w-full gap-3" }}>
            <Typo
              size={"sm"}
              weight={"medium"}
              translate={{ token: "panels:rewardDetail.timeline.verificationBlock.content" }}
            />
            <Button
              isTextButton={true}
              translate={{ token: "panels:rewardDetail.timeline.verificationBlock.button" }}
            />
          </Paper>
        ),
      });
    }

    // TODO ADD the invoicableAt event
    // if (reward.invoiceId) {
    //   items.push({
    //     label: <Translate token="panels:rewardDetail.timeline.requested" />,
    //     endContent: dateKernelPort.format(new Date(), "dd MMM yyyy"),
    //     icon: { component: Hourglass },
    //   });
    // }

    if (reward.requestedAt) {
      items.push({
        label: <Translate token="panels:rewardDetail.timeline.created" values={{ login: reward.from.login }} />,
        endContent: dateKernelPort.format(new Date(reward.requestedAt), "dd MMM yyyy"),
        icon: { component: Loader },
      });
    }

    return items;
  }, [reward]);

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:rewardDetail.timeline.title" }} />
      <TimelineComponent items={timelineItems} />
    </Paper>
  );
}

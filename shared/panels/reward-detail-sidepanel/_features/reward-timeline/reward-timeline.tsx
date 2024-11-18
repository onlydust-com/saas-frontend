import { useClipboard } from "@nextui-org/use-clipboard";
import { Check, Copy, Loader, TriangleAlert } from "lucide-react";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Timeline as TimelineComponent, TimelinePort } from "@/design-system/organisms/timeline";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardTimelineProps } from "./reward-timeline.types";

export function RewardTimeline({ reward }: RewardTimelineProps) {
  const { copy } = useClipboard();
  const dateKernelPort = bootstrap.getDateKernelPort();

  const timelineItems: TimelinePort<AnyType>["items"] = useMemo(() => {
    const items: TimelinePort<AnyType>["items"] = [];

    if (reward.processedAt) {
      items.push({
        label: <Translate token="panels:rewardDetail.timeline.paid.label" />,
        endContent: dateKernelPort.format(new Date(reward.processedAt), "dd MMM yyyy"),
        icon: { component: Check },
        children: (
          <Paper background={"primary"} classNames={{ base: "flex flex-col w-full gap-3" }}>
            <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:rewardDetail.timeline.paid.title" }} />
            <Input
              name={"reference"}
              value={reward.transactionReference}
              canInteract={false}
              endContent={
                <Button
                  iconOnly={true}
                  size={"xs"}
                  variant={"tertiary"}
                  startIcon={{ component: Copy }}
                  onClick={() => copy(reward.transactionReference)}
                />
              }
            />
            <Button
              variant={"secondary"}
              translate={{ token: "panels:rewardDetail.timeline.verificationBlock.button" }}
              as={"a"}
              htmlProps={{
                href: reward.transactionReferenceLink,
                target: "_blank",
              }}
            />
          </Paper>
        ),
      });
    }

    if (reward.isBlocked() && reward.status) {
      items.push({
        label: (
          <Translate
            token={`panels:rewardDetail.timeline.verificationBlock.type.${reward.status}.title`}
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
              translate={{ token: `panels:rewardDetail.timeline.verificationBlock.type.${reward.status}.text` }}
            />
            {reward.status === "PENDING_BILLING_PROFILE" && (
              <Button
                isTextButton={true}
                translate={{
                  token: "panels:rewardDetail.timeline.verificationBlock.type.PENDING_BILLING_PROFILE.button",
                }}
                as={"a"}
                htmlProps={{
                  href: marketplaceRouting(MARKETPLACE_ROUTER.settings.payoutPreferences),
                  target: "_blank",
                }}
              />
            )}
            {reward.status === "INDIVIDUAL_LIMIT_REACHED" && (
              <Button
                isTextButton={true}
                translate={{
                  token: "panels:rewardDetail.timeline.verificationBlock.type.INDIVIDUAL_LIMIT_REACHED.button",
                }}
                as={"a"}
                htmlProps={{
                  href: marketplaceRouting(MARKETPLACE_ROUTER.settings.payoutPreferences),
                  target: "_blank",
                }}
              />
            )}
            {reward.status === "PAYOUT_INFO_MISSING" && (
              <Button
                isTextButton={true}
                translate={{
                  token: "panels:rewardDetail.timeline.verificationBlock.type.PAYOUT_INFO_MISSING.button",
                }}
                as={"a"}
                htmlProps={{
                  href: marketplaceRouting(MARKETPLACE_ROUTER.settings.payoutPreferences),
                  target: "_blank",
                }}
              />
            )}
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

import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronLeft, CircleDollarSign, CircleDot, Clock } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CardContributionKanbanNextUiVariants } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/next-ui/next-ui.variants";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";
import { ContributionInline } from "@/design-system/molecules/contribution-inline";

import { LabelPopover } from "@/shared/components/label-popover/label-popover";
import { UserGroup } from "@/shared/features/user/user-group/user-group";
import { cn } from "@/shared/helpers/cn";

export function CardContributionKanbanNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  type,
  githubStatus,
  githubTitle,
  githubNumber,
  lastUpdatedAt,
  rewardUsdAmount,
  applicants,
  contributors,
  linkedIssues,
  githubLabels,
  actions,
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanNextUiVariants();

  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  function renderRewardAmount() {
    if (!rewardUsdAmount) return null;

    const { amount: rewardAmount, code: rewardCode } = moneyKernelPort.format({
      amount: rewardUsdAmount,
      currency: moneyKernelPort.getCurrency("USD"),
    });

    return (
      <Badge
        color={"grey"}
        size={"xxs"}
        icon={{ component: CircleDollarSign, classNames: { base: "text-components-badge-success-fg" } }}
      >
        {rewardAmount} {rewardCode}
      </Badge>
    );
  }

  function renderUsers() {
    if (applicants?.length) {
      return (
        <div className="flex">
          <UserGroup
            avatarProps={{ size: "xs" }}
            users={applicants}
            maxUsers={2}
            label={{
              size: "xs",
              weight: "regular",
              color: "tertiary",
              translate: {
                token: "cards:cardContributionKanban.applicants",
                count: applicants.length,
              },
            }}
          />
        </div>
      );
    }

    if (contributors?.length) {
      return (
        <div className="flex">
          <UserGroup
            avatarProps={{ size: "xs" }}
            users={contributors}
            maxUsers={2}
            label={{
              size: "xs",
              weight: "regular",
              color: "tertiary",
              translate: {
                token: "cards:cardContributionKanban.contributors",
                count: contributors.length,
              },
            }}
          />
        </div>
      );
    }

    return null;
  }

  function renderLinkedIssues() {
    if (linkedIssues) {
      const linkedIssuesCount = linkedIssues?.length ?? 0;

      if (linkedIssuesCount === 1) {
        const [linkedIssue] = linkedIssues;
        return (
          <ContributionInline
            contributionBadgeProps={{
              type: linkedIssue.type,
              githubStatus: linkedIssue.githubStatus,
              number: linkedIssue.githubNumber,
            }}
            githubTitle={linkedIssue.githubTitle}
            truncate
          />
        );
      }

      if (linkedIssues) {
        return (
          <Accordion showDivider={false} className={"p-0"}>
            <AccordionItem
              startContent={
                <Badge
                  color={"brand"}
                  size={"xxs"}
                  shape={"squared"}
                  icon={{ component: CircleDot, size: "xs" }}
                  iconOnly
                />
              }
              title={
                <Typo
                  size={"xs"}
                  color={"secondary"}
                  translate={{
                    token: "cards:cardContributionKanban.linkedIssues",
                    values: { count: linkedIssuesCount },
                  }}
                />
              }
              indicator={
                <Icon component={ChevronLeft} classNames={{ base: "text-components-badge-brand-fg" }} size={"md"} />
              }
              classNames={{
                base: "px-0",
                trigger: "p-0 gap-xs",
                title: "flex flex-col leading-none",
                content: "py-0",
              }}
            >
              <div className="relative pl-3xl pt-lg">
                <div className="absolute -top-1 bottom-0 left-2.5 w-px bg-components-badge-brand-border" />
                <ul className={"grid gap-sm"}>
                  {linkedIssues.map(issue => {
                    return (
                      <ContributionInline
                        key={issue.githubNumber}
                        contributionBadgeProps={{
                          type: issue.type,
                          githubStatus: issue.githubStatus,
                          number: issue.githubNumber,
                        }}
                        githubTitle={issue.githubTitle}
                        truncate
                      />
                    );
                  })}
                </ul>
              </div>
            </AccordionItem>
          </Accordion>
        );
      }
    }

    return null;
  }

  function renderGithubLabels() {
    if (githubLabels?.length) {
      return (
        <LabelPopover
          labels={githubLabels.map(({ name }) => name)}
          badgeProps={{
            color: "grey",
            size: "xs",
          }}
        />
      );
    }

    return <div />;
  }

  return (
    <Paper
      as={Component}
      {...htmlProps}
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
      size={"lg"}
      background={"secondary"}
      border={"primary"}
    >
      <header className={"flex items-start justify-between gap-lg"}>
        <Typo size={"xs"} weight={"medium"}>
          {githubTitle}
        </Typo>

        <ContributionBadge type={type} githubStatus={githubStatus} number={githubNumber} />
      </header>

      <div className={"grid gap-xl"}>
        <div className={"flex items-center gap-md"}>
          <Typo size={"xs"} classNames={{ base: "flex gap-sm" }} color={"tertiary"}>
            <Icon component={Clock} />
            {dateKernelPort.formatDistanceToNow(new Date(lastUpdatedAt))}
          </Typo>

          {renderRewardAmount()}
        </div>

        {renderUsers()}

        {renderLinkedIssues()}

        <footer className={"flex justify-between gap-lg overflow-hidden"}>
          {renderGithubLabels()}

          {actions ? <ButtonGroup buttons={actions} size={"xs"} /> : null}
        </footer>
      </div>
    </Paper>
  );
}

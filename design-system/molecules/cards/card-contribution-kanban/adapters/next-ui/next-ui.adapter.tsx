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

import { UserGroup } from "@/shared/features/user/user-group/user-group";
import { cn } from "@/shared/helpers/cn";

export function CardContributionKanbanNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  contribution,
  actions,
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanNextUiVariants();

  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  function renderRewardAmount() {
    const amount = contribution.totalRewardedAmount?.totalAmount;

    if (!amount) return null;

    const { amount: rewardAmount, code: rewardCode } = moneyKernelPort.format({
      amount,
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
    if (contribution.isActivityStatusNotAssigned() && contribution.applicants?.length) {
      return (
        <div className="flex">
          <UserGroup
            avatarProps={{ size: "xs" }}
            users={contribution.applicants}
            maxUsers={2}
            label={{
              translate: {
                token: "cards:cardContributionKanban.applicants",
                count: contribution.applicants.length,
              },
            }}
          />
        </div>
      );
    }

    if (!contribution.isActivityStatusNotAssigned() && contribution.contributors?.length) {
      return (
        <div className="flex">
          <UserGroup
            avatarProps={{ size: "xs" }}
            users={contribution.contributors}
            maxUsers={2}
            label={{
              translate: {
                token: "cards:cardContributionKanban.contributors",
                count: contribution.contributors.length,
              },
            }}
          />
        </div>
      );
    }

    return null;
  }

  function renderLinkedIssues() {
    const linkedIssuesCount = contribution.linkedIssues?.length ?? 0;

    if (contribution.canShowLinkedIssues()) {
      if (linkedIssuesCount === 1) {
        return (
          <ContributionInline
            contributionBadgeProps={{
              type: contribution.type,
              githubStatus: contribution.githubStatus,
              number: contribution.githubNumber,
            }}
            githubTitle={contribution.githubTitle}
            truncate
          />
        );
      }

      if (contribution.linkedIssues) {
        return (
          <Accordion showDivider={false} className={"p-0"}>
            <AccordionItem
              // TODO @hayden handle issue status, what is it dependant on ? Contribution status ? Issue status ?
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
                heading: "",
                trigger: "p-0 gap-xs",
                titleWrapper: "",
                title: "flex flex-col leading-none",
                subtitle: "",
                startContent: "",
                indicator: "",
                content: "py-0",
              }}
            >
              <div className="relative pl-3xl pt-lg">
                <div className="absolute -top-1 bottom-0 left-2.5 w-px bg-components-badge-brand-border" />
                <ul className={"grid gap-sm"}>
                  {contribution.linkedIssues.map(issue => {
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
    const { githubLabels } = contribution;
    const githubLabelsCount = githubLabels?.length;

    if (githubLabelsCount) {
      return (
        <Badge color={"grey"} size={"xs"}>
          {githubLabelsCount > 1 ? `${githubLabels[0].name} +${githubLabelsCount - 1}` : githubLabels[0].name}
        </Badge>
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
          {contribution.githubTitle}
        </Typo>

        <ContributionBadge
          type={contribution.type}
          githubStatus={contribution.githubStatus}
          number={contribution.githubNumber}
        />
      </header>

      <div className={"grid gap-xl"}>
        <div className={"flex items-center gap-md"}>
          <Typo size={"xs"} classNames={{ base: "flex gap-sm" }} color={"tertiary"}>
            <Icon component={Clock} />
            {dateKernelPort.formatDistanceToNow(new Date(contribution.lastUpdatedAt))}
          </Typo>

          {renderRewardAmount()}
        </div>

        {renderUsers()}

        {renderLinkedIssues()}

        <footer className={"flex justify-between gap-lg"}>
          {renderGithubLabels()}

          {actions ? <ButtonGroup buttons={actions} size={"xs"} /> : null}
        </footer>
      </div>
    </Paper>
  );
}

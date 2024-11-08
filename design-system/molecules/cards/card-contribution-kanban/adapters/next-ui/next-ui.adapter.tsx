import dynamic from "next/dynamic";
import { ElementType } from "react";

import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Applicants } from "@/design-system/molecules/cards/card-contribution-kanban/_components/applicants/applicants";
import { Contributors } from "@/design-system/molecules/cards/card-contribution-kanban/_components/contributors/contributors";
import { GithubLabels } from "@/design-system/molecules/cards/card-contribution-kanban/_components/github-labels/github-labels";
import { LastUpdatedAt } from "@/design-system/molecules/cards/card-contribution-kanban/_components/last-updated-at/last-updated-at";
import { LinkedIssues } from "@/design-system/molecules/cards/card-contribution-kanban/_components/linked-issues/linked-issues";
import { Project } from "@/design-system/molecules/cards/card-contribution-kanban/_components/project/project";
import { RewardUsdAmount } from "@/design-system/molecules/cards/card-contribution-kanban/_components/reward-usd-amount/reward-usd-amount";
import { CardContributionKanbanNextUiVariants } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/next-ui/next-ui.variants";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { cn } from "@/shared/helpers/cn";

const Emoji = dynamic(() => import("react-emoji-render"));

export function CardContributionKanbanNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  type,
  githubStatus,
  githubTitle,
  githubNumber,
  lastUpdatedAt,
  rewardUsdAmount,
  applicants,
  contributors,
  project,
  linkedIssues,
  githubLabels,
  actions,
  showActions = true,
  onClick,
  size = "lg",
  background = "secondary",
  border = "primary",
  endContent,
  ...restProps
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanNextUiVariants();

  function renderUsers() {
    if (applicants?.length) {
      return <Applicants applicants={applicants} />;
    }

    if (contributors?.length) {
      return <Contributors contributors={contributors} />;
    }

    // TODO fix this condition
    if (project) {
      return <Project project={project} />;
    }

    return null;
  }

  function renderFooter() {
    if (!githubLabels?.length && !actions?.length && !endContent) {
      return null;
    }

    return (
      <footer className={"flex flex-wrap justify-between gap-lg overflow-hidden"}>
        <div>
          <GithubLabels githubLabels={githubLabels} />
        </div>

        {actions?.length && showActions ? <ButtonGroup buttons={actions} size={"xs"} /> : null}

        {endContent}
      </footer>
    );
  }

  return (
    <Paper
      as={Component}
      {...restProps}
      classNames={{
        base: cn(slots.base(), classNames?.base, { "cursor-pointer": Boolean(onClick) }),
      }}
      size={size}
      background={background}
      border={border}
      onClick={onClick}
    >
      <header className={"flex w-full items-start justify-between gap-lg overflow-hidden"}>
        <Typo
          htmlProps={{ title: githubTitle }}
          size={"xs"}
          weight={"medium"}
          classNames={{
            base: "text-wrap line-clamp-2",
          }}
        >
          <Emoji>{githubTitle}</Emoji>
        </Typo>

        <div>
          <ContributionBadge type={type} githubStatus={githubStatus} number={githubNumber} />
        </div>
      </header>

      <div className={"grid gap-xl"}>
        <div className={"flex items-center gap-md empty:hidden"}>
          <LastUpdatedAt lastUpdatedAt={lastUpdatedAt} />
          <RewardUsdAmount rewardUsdAmount={rewardUsdAmount} />
        </div>

        {renderUsers()}

        <LinkedIssues linkedIssues={linkedIssues} />

        {renderFooter()}
      </div>
    </Paper>
  );
}

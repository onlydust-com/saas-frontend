import { Github } from "lucide-react";
import dynamic from "next/dynamic";
import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Applicants } from "@/design-system/molecules/cards/card-contribution-kanban/_components/applicants/applicants";
import { Contributors } from "@/design-system/molecules/cards/card-contribution-kanban/_components/contributors/contributors";
import { GithubLabels } from "@/design-system/molecules/cards/card-contribution-kanban/_components/github-labels/github-labels";
import { Languages } from "@/design-system/molecules/cards/card-contribution-kanban/_components/languages/languages";
import { LastUpdatedAt } from "@/design-system/molecules/cards/card-contribution-kanban/_components/last-updated-at/last-updated-at";
import { LinkedIssues } from "@/design-system/molecules/cards/card-contribution-kanban/_components/linked-issues/linked-issues";
import { Project } from "@/design-system/molecules/cards/card-contribution-kanban/_components/project/project";
import { Repo } from "@/design-system/molecules/cards/card-contribution-kanban/_components/repo/repo";
import { RewardUsdAmount } from "@/design-system/molecules/cards/card-contribution-kanban/_components/reward-usd-amount/reward-usd-amount";
import { CardContributionKanbanNextUiVariants } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/next-ui/next-ui.variants";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { BaseLink } from "@/shared/components/base-link/base-link";
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
  languages,
  repo,
  actions,
  onClick,
  size = "lg",
  background = "secondary",
  border = "primary",
  githubHtmlUrl,
  customContent,
  ...restProps
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanNextUiVariants();

  function renderHeader() {
    return (
      <header className="flex w-full justify-between gap-md">
        <div className="flex flex-col gap-lg">
          <Typo
            htmlProps={{ title: githubTitle }}
            size="xs"
            weight="medium"
            classNames={{
              base: "text-wrap line-clamp-2",
            }}
          >
            <Emoji>{githubTitle}</Emoji>
          </Typo>

          <div className="flex items-center gap-md empty:hidden">
            <LastUpdatedAt lastUpdatedAt={lastUpdatedAt} />
            <RewardUsdAmount rewardUsdAmount={rewardUsdAmount} />
          </div>
        </div>

        <div>
          <ContributionBadge type={type} githubStatus={githubStatus} number={githubNumber} />
        </div>
      </header>
    );
  }

  function renderUsers() {
    if (applicants?.length) {
      return (
        <div className="flex">
          <Applicants applicants={applicants} />
        </div>
      );
    }

    if (contributors?.length) {
      return (
        <div className="flex">
          <Contributors contributors={contributors} />
        </div>
      );
    }

    if (project) {
      return (
        <div className="flex">
          <Project project={project} />
        </div>
      );
    }

    return null;
  }

  function renderIssues() {
    return <LinkedIssues linkedIssues={linkedIssues} />;
  }

  function renderTags() {
    return (
      <div className="flex flex-wrap items-center gap-sm empty:hidden">
        <Repo repo={repo} />
        <GithubLabels githubLabels={githubLabels} />
        <Languages languages={languages} />
      </div>
    );
  }

  function renderFooter() {
    return (
      <footer className="flex items-center justify-between gap-md">
        {actions?.length ? <ButtonGroup buttons={actions} size="xs" /> : null}
        {customContent}

        {!actions?.length && !customContent ? <div /> : null}

        <Button
          size="xs"
          variant="secondary"
          as={BaseLink}
          iconOnly
          htmlProps={{ href: githubHtmlUrl, target: "_blank" }}
          startIcon={{
            component: Github,
          }}
        />
      </footer>
    );
  }

  return (
    <Paper
      as={Component}
      {...restProps}
      classNames={{
        base: cn(slots.base(), classNames?.base, {
          "cursor-pointer": Boolean(onClick),
        }),
      }}
      size={size}
      background={background}
      border={border}
      onClick={onClick}
    >
      {renderHeader()}
      {renderUsers()}
      {renderIssues()}
      {renderTags()}
      {renderFooter()}
    </Paper>
  );
}

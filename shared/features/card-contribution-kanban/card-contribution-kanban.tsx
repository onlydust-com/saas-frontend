import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";

import { CardContributionKanbanProps } from "./card-contribution-kanban.types";

export function CardContributionKanban({
  contribution,
  classNames,
  showActions,
  showContributors = true,
  showProject = false,
  as,
  ...actions
}: CardContributionKanbanProps) {
  const { buttons, endContent } = useContributionActions({ as, contribution, actions });

  return (
    <Card
      classNames={classNames}
      type={contribution.type}
      githubTitle={contribution.githubTitle}
      githubStatus={contribution.githubStatus}
      githubNumber={contribution.githubNumber}
      lastUpdatedAt={contribution.lastUpdatedAt}
      rewardUsdAmount={contribution.totalRewardedUsdAmount}
      applicants={contribution.isNotAssigned() ? contribution.applicants : []}
      contributors={showContributors ? contribution.contributors : []}
      linkedIssues={contribution.linkedIssues}
      githubLabels={contribution.githubLabels}
      project={showProject ? contribution.project : undefined}
      actions={buttons as ButtonGroupPort["buttons"]}
      showActions={showActions}
      onClick={() => actions?.onAction?.(contribution.id)}
      endContent={endContent}
    />
  );
}

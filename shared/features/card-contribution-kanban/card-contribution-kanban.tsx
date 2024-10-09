import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { CardContributionKanbanHooks } from "@/shared/features/card-contribution-kanban/card-contribution-kanban.hooks";

import { CardContributionKanbanProps } from "./card-contribution-kanban.types";

export function CardContributionKanban({ contribution, classNames, ...actions }: CardContributionKanbanProps) {
  const actionGroup = CardContributionKanbanHooks.useContributionActions(contribution, actions);

  return (
    <Card
      classNames={classNames}
      type={contribution.type}
      githubTitle={contribution.githubTitle}
      githubStatus={contribution.githubStatus}
      githubNumber={contribution.githubNumber}
      lastUpdatedAt={contribution.lastUpdatedAt}
      rewardUsdAmount={contribution.totalRewardedAmount?.totalAmount}
      applicants={contribution.applicants}
      contributors={contribution.contributors}
      linkedIssues={contribution.linkedIssues}
      githubLabels={contribution.githubLabels}
      actions={actionGroup}
      onClick={() => actions?.onAction?.(contribution.id)}
    />
  );
}

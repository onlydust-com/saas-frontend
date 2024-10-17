import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";

import { CardContributionKanbanProps } from "./card-contribution-kanban.types";

export function CardContributionKanban({ contribution, classNames, ...actions }: CardContributionKanbanProps) {
  const actionGroup = useContributionActions(contribution, actions) as ButtonGroupPort["buttons"];

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
      onClick={() => actions?.onAction?.(contribution.githubId)}
    />
  );
}

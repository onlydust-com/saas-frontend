import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { CardContributionKanbanHooks } from "@/shared/features/card-contribution-kanban/card-contribution-kanban.hooks";

import { CardContributionKanbanProps } from "./card-contribution-kanban.types";

export function CardContributionKanban({ contribution, ...actions }: CardContributionKanbanProps) {
  const actionGroup = CardContributionKanbanHooks.useContributionActions(contribution, actions);
  return (
    <div className={"bg-background-primary p-3"} key={contribution.id}>
      <ContributionBadge
        type={contribution.type}
        githubStatus={contribution.githubStatus}
        number={contribution.githubNumber}
      />
      {contribution.githubTitle}
      {actionGroup?.length > 0 && (
        <div className={"flex justify-end gap-2"}>
          <ButtonGroup size={"xs"} buttons={actionGroup} />
        </div>
      )}
    </div>
  );
}

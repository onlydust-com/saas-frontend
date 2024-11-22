import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Contributions } from "@/app/manage-projects/[projectSlug]/_features/contributions/contributions";
import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/_features/contributors-table/contributors-table";
import { Financial } from "@/app/manage-projects/[projectSlug]/_features/financial/financial";
import { TransactionsTrigger } from "@/app/manage-projects/[projectSlug]/_features/financial/transactions-trigger/transactions-trigger";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useCanReward } from "@/shared/hooks/rewards/use-can-reward";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ActivitySectionProps } from "./activity-section.types";

enum ActivityTabs {
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "FINANCIAL" = "FINANCIAL",
}

export function ActivitySection({ projectId }: ActivitySectionProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { close } = useSidePanelsContext();
  const { open: openProject } = useProjectUpdateSidePanel();
  const { open: openRewardFlow } = useRewardFlow();
  const canReward = useCanReward(projectSlug);

  const [toggleFinancialViews, setToggleFinancialViews] = useState<ActivityTabs>(ActivityTabs.CONTRIBUTORS);
  const isViewContributors = toggleFinancialViews === ActivityTabs.CONTRIBUTORS;
  const isViewContributions = toggleFinancialViews === ActivityTabs.CONTRIBUTIONS;
  const isViewFinancial = toggleFinancialViews === ActivityTabs.FINANCIAL;

  const renderActivityView = useMemo(() => {
    if (isViewContributors) {
      return <ContributorsTable />;
    }

    if (isViewContributions) {
      return <Contributions projectId={projectId} />;
    }

    if (isViewFinancial) {
      return <Financial />;
    }
  }, [isViewContributors, isViewContributions, isViewFinancial]);

  function handleToggleActivityViews(view: string) {
    close();
    setToggleFinancialViews(view as ActivityTabs);
  }

  return (
    <div className="flex h-full flex-col gap-lg">
      <div className="flex flex-col flex-wrap items-start justify-between gap-2 tablet:flex-row tablet:items-center">
        <Tabs
          onTabClick={handleToggleActivityViews}
          variant={"solid"}
          searchParams={"activity-view"}
          tabs={[
            {
              id: ActivityTabs.CONTRIBUTORS,
              children: <Translate token={"manageProjects:detail.activity.buttons.contributors"} />,
            },
            {
              id: ActivityTabs.CONTRIBUTIONS,
              children: <Translate token={"manageProjects:detail.activity.buttons.contributions"} />,
            },
            {
              id: ActivityTabs.FINANCIAL,
              children: <Translate token={"manageProjects:detail.activity.buttons.financial"} />,
            },
          ]}
          selectedId={toggleFinancialViews}
        />

        <div className={"flex items-center gap-lg"}>
          {!!projectId && (
            <Button
              variant={"secondary"}
              size={"sm"}
              translate={{ token: "manageProjects:detail.activity.actions.editProject" }}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              onClick={() => openProject({ projectId })}
            />
          )}

          {isViewFinancial ? <TransactionsTrigger /> : null}

          <Tooltip enabled={!canReward} content={<Translate token="common:tooltip.disabledReward" />}>
            <Button
              variant={"primary"}
              size={"sm"}
              translate={{ token: "manageProjects:detail.activity.actions.reward" }}
              onClick={() => openRewardFlow({ githubUserIds: [] })}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              isDisabled={!canReward}
            />
          </Tooltip>
        </div>
      </div>

      {renderActivityView}
    </div>
  );
}

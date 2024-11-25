import { useMemo, useState } from "react";

import { Contributions } from "@/app/manage-projects/[projectSlug]/_views/contributions/contributions";
import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/_views/contributors/contributors-table/contributors-table";
import { Financial } from "@/app/manage-projects/[projectSlug]/_views/financial/financial";
import { TransactionsTrigger } from "@/app/manage-projects/[projectSlug]/_views/financial/transactions-trigger/transactions-trigger";
import { ViewsProps } from "@/app/manage-projects/[projectSlug]/_views/views.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useCanReward } from "@/shared/hooks/rewards/use-can-reward";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

enum ManageProgramsViews {
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "FINANCIAL" = "FINANCIAL",
}

export function Views({ projectId, projectSlug }: ViewsProps) {
  const { close } = useSidePanelsContext();
  const { open: openProject } = useProjectUpdateSidePanel();
  const { open: openRewardFlow } = useRewardFlow();
  const canReward = useCanReward(projectSlug);

  const [view, setView] = useState<ManageProgramsViews>(ManageProgramsViews.CONTRIBUTORS);
  const isViewContributors = view === ManageProgramsViews.CONTRIBUTORS;
  const isViewContributions = view === ManageProgramsViews.CONTRIBUTIONS;
  const isViewFinancial = view === ManageProgramsViews.FINANCIAL;

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

    return null;
  }, [isViewContributors, isViewContributions, isViewFinancial]);

  function handleToggleView(view: string) {
    close();
    setView(view as ManageProgramsViews);
  }

  return (
    <div className="flex h-full flex-col gap-lg">
      <div className="flex flex-col flex-wrap items-start justify-between gap-2 tablet:flex-row tablet:items-center">
        <Tabs
          onTabClick={handleToggleView}
          variant={"solid"}
          searchParams={"activity-view"}
          tabs={[
            {
              id: ManageProgramsViews.CONTRIBUTORS,
              children: <Translate token={"manageProjects:detail.views.contributors"} />,
            },
            {
              id: ManageProgramsViews.CONTRIBUTIONS,
              children: <Translate token={"manageProjects:detail.views.contributions"} />,
            },
            {
              id: ManageProgramsViews.FINANCIAL,
              children: <Translate token={"manageProjects:detail.views.financial"} />,
            },
          ]}
          selectedId={view}
        />

        <div className={"flex items-center gap-lg"}>
          {!!projectId && (
            <Button
              variant={"secondary"}
              size={"sm"}
              translate={{ token: "manageProjects:detail.actions.editProject" }}
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
              translate={{ token: "manageProjects:detail.actions.reward" }}
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

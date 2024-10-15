import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Contributions } from "@/app/manage-projects/[projectSlug]/features/contributions/contributions";
import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table";
import { RewardsTable } from "@/app/manage-projects/[projectSlug]/features/rewards-table/rewards-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ActivitySectionProps } from "./activity-section.types";

const CONTRIBUTORS = "contributors";
const CONTRIBUTIONS = "contributions";
const REWARDS = "rewards";

export function ActivitySection({ projectId }: ActivitySectionProps) {
  const { open } = useRewardFlow();
  const [toggleFinancialViews, setToggleFinancialViews] = useState<
    typeof CONTRIBUTORS | typeof CONTRIBUTIONS | typeof REWARDS
  >(CONTRIBUTORS);

  const renderActivityView = useMemo(() => {
    if (toggleFinancialViews === CONTRIBUTORS) {
      return <ContributorsTable />;
    }

    if (toggleFinancialViews === CONTRIBUTIONS) {
      return <Contributions projectId={projectId} />;
    }

    return <RewardsTable />;
  }, [toggleFinancialViews]);

  function handleToggleActivityViews(view: string) {
    close();
    setToggleFinancialViews(view as typeof CONTRIBUTORS | typeof CONTRIBUTIONS | typeof REWARDS);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col flex-wrap items-start justify-between gap-2 tablet:flex-row tablet:items-center">
        <div className="flex flex-col items-start justify-start gap-2 tablet:flex-row tablet:items-center">
          <Button onClick={() => open({ issueIds: [], githubUserIds: [] })}>Open reward flow</Button>
          <Typo
            size={"xs"}
            weight={"medium"}
            variant={"heading"}
            translate={{ token: "manageProjects:detail.activity.title" }}
          />

          <Tabs
            onTabClick={handleToggleActivityViews}
            variant={"solid"}
            tabs={[
              {
                id: CONTRIBUTORS,
                children: <Translate token={"manageProjects:detail.activity.buttons.contributors"} />,
              },
              {
                id: CONTRIBUTIONS,
                children: <Translate token={"manageProjects:detail.activity.buttons.contributions"} />,
              },
              {
                id: REWARDS,
                children: <Translate token={"manageProjects:detail.activity.buttons.rewards"} />,
              },
            ]}
            selectedId={toggleFinancialViews}
          />
        </div>

        <Button
          variant={"primary"}
          endIcon={{ component: ChevronRight }}
          isTextButton
          size={"md"}
          translate={{ token: "manageProjects:detail.activity.actions.reward" }}
          onClick={() => console.log("Open reward")}
          classNames={{
            base: "max-w-full overflow-hidden",
            label: "whitespace-nowrap text-ellipsis overflow-hidden",
          }}
        />
      </div>

      {renderActivityView}
    </div>
  );
}

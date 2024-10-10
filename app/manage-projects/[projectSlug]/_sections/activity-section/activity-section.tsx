import { useMemo, useState } from "react";

import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table";
import { Issues } from "@/app/manage-projects/[projectSlug]/features/issues/issues";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ActivitySectionProps } from "./activity-section.types";

const CONTRIBUTORS = "contributors";
const ISSUES = "issues";

export function ActivitySection({ projectId }: ActivitySectionProps) {
  const { open } = useRewardFlow();
  const [toggleFinancialViews, setToggleFinancialViews] = useState<typeof CONTRIBUTORS | typeof ISSUES>(CONTRIBUTORS);

  const renderActivityView = useMemo(() => {
    if (toggleFinancialViews === CONTRIBUTORS) {
      return <ContributorsTable />;
    }

    return <Issues projectId={projectId} />;
  }, [toggleFinancialViews]);

  function handleToggleActivityViews(view: string) {
    close();
    setToggleFinancialViews(view as typeof CONTRIBUTORS | typeof ISSUES);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col items-start justify-start gap-2 tablet:flex-row tablet:items-center">
        <Button onClick={() => open({ issueIds: [], githubUserIds: [] })}>Open reward flow</Button>
        <Typo
          size={"xs"}
          weight={"medium"}
          variant={"heading"}
          translate={{ token: "manageProjects:detail.contributions.title" }}
        />
        <Tabs
          onTabClick={handleToggleActivityViews}
          variant={"solid"}
          tabs={[
            {
              id: CONTRIBUTORS,
              children: <Translate token={"manageProjects:detail.contributions.buttons.contributors"} />,
            },
            {
              id: ISSUES,
              children: <Translate token={"manageProjects:detail.contributions.buttons.contributions"} />,
            },
          ]}
          selectedId={toggleFinancialViews}
        />
      </div>

      {renderActivityView}
    </div>
  );
}

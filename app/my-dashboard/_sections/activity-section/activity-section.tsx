import { useMemo, useState } from "react";

import { Contributions } from "@/app/my-dashboard/_features/contributions/contributions";
import { RewardsTable } from "@/app/my-dashboard/_features/rewards-table/rewards-table";

import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

enum ActivityTabs {
  "PROJECTS" = "PROJECTS",
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "REWARDS" = "REWARDS",
}

export function ActivitySection() {
  const { close } = useSidePanelsContext();

  const [toggleActivityView, setToggleActivityView] = useState<ActivityTabs>(ActivityTabs.CONTRIBUTIONS);

  const renderActivityView = useMemo(() => {
    if (toggleActivityView === ActivityTabs.PROJECTS) {
      return "PROJECTS";
    }

    if (toggleActivityView === ActivityTabs.CONTRIBUTIONS) {
      return <Contributions />;
    }

    if (toggleActivityView === ActivityTabs.REWARDS) {
      return <RewardsTable />;
    }

    return null;
  }, [toggleActivityView]);

  function handleToggleActivityViews(view: string) {
    close();
    setToggleActivityView(view as ActivityTabs);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col flex-wrap items-start justify-between gap-2 tablet:flex-row tablet:items-center">
        <div className="flex flex-col items-start justify-start gap-2 tablet:flex-row tablet:items-center">
          <Typo
            size={"xs"}
            weight={"medium"}
            variant={"heading"}
            translate={{ token: "myDashboard:detail.activity.title" }}
          />

          <Tabs
            onTabClick={handleToggleActivityViews}
            variant={"solid"}
            searchParams={"activity-view"}
            tabs={[
              {
                id: ActivityTabs.PROJECTS,
                children: <Translate token={"myDashboard:detail.activity.buttons.projects"} />,
              },
              {
                id: ActivityTabs.CONTRIBUTIONS,
                children: <Translate token={"myDashboard:detail.activity.buttons.contributions"} />,
              },
              {
                id: ActivityTabs.REWARDS,
                children: <Translate token={"myDashboard:detail.activity.buttons.rewards"} />,
              },
            ]}
            selectedId={toggleActivityView}
          />
        </div>
      </div>

      {renderActivityView}
    </div>
  );
}

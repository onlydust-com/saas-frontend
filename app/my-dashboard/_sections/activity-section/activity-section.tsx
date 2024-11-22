import { useMemo, useState } from "react";

import { Contributions } from "@/app/my-dashboard/_features/contributions/contributions";
import { Financial } from "@/app/my-dashboard/_features/financial/financial";
import { TransactionsTrigger } from "@/app/my-dashboard/_features/financial/transactions-trigger/transactions-trigger";
import { ProjectsTable } from "@/app/my-dashboard/_features/projects-table/projects-table";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

enum ActivityTabs {
  "PROJECTS" = "PROJECTS",
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "FINANCIAL" = "FINANCIAL",
}

export function ActivitySection() {
  const { close } = useSidePanelsContext();
  const { open: openRequestPaymentFlow } = useRequestPaymentFlow();

  const [toggleActivityView, setToggleActivityView] = useState<ActivityTabs>(ActivityTabs.CONTRIBUTIONS);
  const isViewProjects = toggleActivityView === ActivityTabs.PROJECTS;
  const isViewContributions = toggleActivityView === ActivityTabs.CONTRIBUTIONS;
  const isViewFinancial = toggleActivityView === ActivityTabs.FINANCIAL;

  const { githubUserId } = useAuthUser();

  const { data: rewardsData } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      recipientIds: githubUserId ? [githubUserId] : undefined,
      statuses: ["PENDING_REQUEST"],
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  const hasRewards = Boolean(rewardsData?.pages[0].totalItemNumber);

  const renderActivityView = useMemo(() => {
    if (isViewContributions) {
      return <Contributions />;
    }

    if (isViewProjects) {
      return <ProjectsTable />;
    }

    if (isViewFinancial) {
      return <Financial />;
    }

    return null;
  }, [isViewProjects, isViewContributions, isViewFinancial]);

  function handleToggleActivityViews(view: string) {
    close();
    setToggleActivityView(view as ActivityTabs);
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
              id: ActivityTabs.CONTRIBUTIONS,
              children: <Translate token={"myDashboard:detail.activity.buttons.contributions"} />,
            },
            {
              id: ActivityTabs.PROJECTS,
              children: <Translate token={"myDashboard:detail.activity.buttons.projects"} />,
            },
            {
              id: ActivityTabs.FINANCIAL,
              children: <Translate token={"myDashboard:detail.activity.buttons.financial"} />,
            },
          ]}
          selectedId={toggleActivityView}
        />

        <div className="flex items-center gap-lg">
          {isViewFinancial ? <TransactionsTrigger /> : null}

          <Tooltip
            enabled={!hasRewards}
            content={<Translate token="myDashboard:detail.activity.tooltip.disabledRequestPayment" />}
          >
            <Button
              variant="primary"
              size="sm"
              translate={{
                token: "myDashboard:detail.activity.actions.requestPayment",
              }}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              onClick={() => openRequestPaymentFlow({})}
              isDisabled={!hasRewards}
              endContent={
                <Badge
                  size={"xxs"}
                  color={hasRewards ? "brand" : "grey"}
                  variant={hasRewards ? "solid" : "flat"}
                  shape={"rounded"}
                >
                  {rewardsData?.pages[0].totalItemNumber}
                </Badge>
              }
            />
          </Tooltip>
        </div>
      </div>

      {renderActivityView}
    </div>
  );
}

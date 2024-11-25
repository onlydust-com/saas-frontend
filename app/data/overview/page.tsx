"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { Paper } from "@/design-system/atoms/paper";

import { withClientOnly } from "@/shared/components/client-only/client-only";

import { ActiveUsersChart } from "./_features/active-users-section/components/active-users-chart/active-users-chart";
import { ContributorHistogramChart } from "./_features/contributor-histogram-chart/contributor-histogram-chart";
import { ProjectHistogramChart } from "./_features/project-histogram-chart/project-histogram-chart";

function DataOverviewPage() {
  return (
    <div className={"flex flex-row justify-between gap-3"}>
      <div className={"flex flex-1 flex-col gap-3"}>
        <Paper border={"primary"}>
          <ContributorHistogramChart />
        </Paper>
        <Paper border={"primary"}>
          <ProjectHistogramChart />
        </Paper>
      </div>
      <Paper classNames={{ base: "flex flex-1 flex-col gap-3" }} border={"primary"}>
        <ActiveUsersChart />
      </Paper>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(DataOverviewPage));

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ActiveContributorsAlert } from "@/app/data/_components/active-contributors-alert/active-contributors-alert";
import { ActiveUsersBarChart } from "@/app/data/overview/_features/active-users-bar-chart/active-users-bar-chart";
import { ActiveUsersMapChart } from "@/app/data/overview/_features/active-users-map-chart/active-users-map-chart";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { ContributorHistogramChart } from "./_features/contributor-histogram-chart/contributor-histogram-chart";
import { ProjectHistogramChart } from "./_features/project-histogram-chart/project-histogram-chart";

function DataOverviewPage() {
  return (
    <ScrollView>
      <div className={"flex flex-1 flex-row justify-between gap-3 overflow-hidden"}>
        <div className={"flex flex-1 flex-col gap-3"}>
          <Paper border={"primary"}>
            <ProjectHistogramChart />
          </Paper>
          <Paper border={"primary"}>
            <ContributorHistogramChart />
          </Paper>
        </div>
        <div className="flex flex-1 flex-col gap-lg">
          <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg h-full" }}>
            <Typo
              weight={"medium"}
              size={"md"}
              color={"primary"}
              translate={{ token: "data:activeUsers.header.title" }}
            />
            <ActiveUsersMapChart />
            <div className="flex-1 overflow-hidden">
              <ScrollView>
                <ActiveUsersBarChart />
              </ScrollView>
            </div>
            <ActiveContributorsAlert />
          </Paper>
        </div>
      </div>
    </ScrollView>
  );
}

export default withClientOnly(withAuthenticationRequired(DataOverviewPage));

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { HackathonKpi } from "@/app/hackathons/_components/hackathon-kpi/hackathon-kpi";
import { HackathonKpiType } from "@/app/hackathons/_components/hackathon-kpi/hackathon-kpi.types";
import { HackathonListBanner } from "@/app/hackathons/_features/hackathon-list-banner/hackathon-list-banner";

import { Paper } from "@/design-system/atoms/paper";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function HackathonsPage() {
  return (
    <div className="pb-7xl">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"hackathon:list.title"} />,
          },
        ]}
      />

      <div className="mx-auto flex flex-col gap-4xl py-4xl">
        <HackathonListBanner />

        <Paper background="glass">
          <HackathonKpi type={HackathonKpiType.Registered} nbRegistered={123} trend={{ value: 123, direction: "up" }} />
          <HackathonKpi type={HackathonKpiType.AvailableIssues} nbAvailableIssues={123} totalAvailableIssues={123} />
          <HackathonKpi type={HackathonKpiType.Projects} nbRegistered={123} />
          <HackathonKpi type={HackathonKpiType.EndsIn} endsIn={"2025-10-05T14:48:00.000Z"} />
        </Paper>
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(HackathonsPage));

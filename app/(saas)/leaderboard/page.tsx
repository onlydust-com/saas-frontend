"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { LeaderboardPodium } from "./_features/leaderboard-podium/leaderboard-podium";
import { LeaderboardTable } from "./_features/leaderboard-table/leaderboard-table";
import { PageHeader } from "./_features/page-header/page-header";

function LeaderboardPage() {
  return (
    <PageContainer size="full">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Leaderboard",
          },
        ]}
      />

      <div className="flex flex-col gap-2 pt-4">
        <PageHeader />
        <PageInner className="relative z-[1] flex flex-col items-center">
          <div className="flex max-w-[600px] flex-col gap-2">
            <LeaderboardPodium />
            <LeaderboardTable />
          </div>
        </PageInner>
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(LeaderboardPage));

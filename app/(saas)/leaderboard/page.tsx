"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";
import { withAuthenticated } from "@/shared/providers/auth-provider";

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
      <div className="flex flex-col gap-16 pt-4">
        <PageHeader />
        <PageInner className="relative z-[1] flex w-full flex-col gap-14">
          <LeaderboardTable />
        </PageInner>
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(LeaderboardPage));

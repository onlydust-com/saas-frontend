"use client";

import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { UserStats } from "./_features/user-stats/user-stats";

export default function UserOverviewPage({ params: { userSlug } }: { params: { userSlug: string } }) {
  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorId: Number(userSlug) },
    options: {
      enabled: Boolean(userSlug),
    },
  });

  const renderStats = useMemo(() => {
    if (isLoading)
      return (
        <div className="p-xl">
          <Skeleton className="h-20" />
        </div>
      );

    if (isError) return <ErrorState />;

    return (
      <UserStats
        rewardCount={data?.rewardCount}
        contributionCount={data?.contributionCount}
        inProgressIssueCount={data?.inProgressIssueCount}
        prCount={data?.prCount}
      />
    );
  }, [isLoading, isError, data]);
  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Users",
            href: NEXT_ROUTER.users.root,
          },
          {
            id: "slug",
            label: userSlug,
          },
          {
            id: "overview",
            label: <Translate token={"users:details.tabs.overview"} />,
          },
        ]}
      />
      {renderStats}
    </ScrollView>
  );
}

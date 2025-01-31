"use client";

import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Accordion } from "@/design-system/molecules/accordion";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Timeline } from "@/shared/features/contributors/timeline/timeline";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Activity } from "./_features/activity/activity";
import { ProjectsList } from "./_features/projects-list/projects-list";
import { UserStats } from "./_features/user-stats/user-stats";

function UserOverviewPage({ params: { userSlug } }: { params: { userSlug: string } }) {
  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorIdOrLogin: userSlug },
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
        projectCount={{ value: data?.projects?.length ?? 0 }}
        inProgressIssueCount={data?.inProgressIssueCount}
        prCount={data?.prCount}
      />
    );
  }, [isLoading, isError, data]);

  const renderTimeline = useMemo(() => {
    if (isLoading)
      return (
        <div className="p-xl">
          <Skeleton className="h-20" />
        </div>
      );

    if (isError || !data) return <ErrorState />;

    return (
      <div className="flex w-full flex-row items-stretch justify-start gap-4 border-b-1 border-border-primary">
        <Accordion
          inline={true}
          defaultSelected={["activity"]}
          classNames={{ heading: "after:hidden", base: "p-4", content: "py-4" }}
          id={"activity"}
          titleProps={{
            size: "md",
            weight: "medium",
            children: "Contributions Activity",
          }}
        >
          <div className="flex w-full flex-col gap-4">
            <Timeline location="page" user={data} />
          </div>
        </Accordion>
      </div>
    );
  }, [isLoading, isError, data]);

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Users",
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
      <ProjectsList userSlug={userSlug} />
      <Activity userSlug={userSlug} />
      {renderTimeline}
    </ScrollView>
  );
}

export default withClientOnly(UserOverviewPage);

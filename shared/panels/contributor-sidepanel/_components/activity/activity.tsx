import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { ActivityGraph } from "@/shared/features/contributors/activity-graph/activity-graph";

import { ActivityProps } from "./activity.types";

export function Activity({ user }: ActivityProps) {
  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorActivityById({
    pathParams: { contributorId: user.contributor.githubUserId },
    queryParams: {
      dataSource: "ALL",
    },
    options: {
      enabled: !!user.contributor.githubUserId,
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo
        size={"sm"}
        weight={"medium"}
        translate={{ token: "panels:contributor.activity.title", values: { number: data?.totalCount || 0 } }}
      />
      <ActivityGraph data={data?.days} />
    </Paper>
  );
}

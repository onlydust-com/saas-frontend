import { Medal } from "lucide-react";
import { useMemo } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";
import { bootstrap } from "@/core/bootstrap";

import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";

import { ActivityGraph } from "@/shared/features/activity-graph/activity-graph";
import { ActivityGraphWeeksData } from "@/shared/features/activity-graph/activity-graph.types";
import { getLevelFromCount } from "@/shared/features/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "@/shared/features/activity-graph/utils/getLevelRange";
import { getWeekId } from "@/shared/features/activity-graph/utils/getWeekId";

import { ActivityProps } from "./activity.types";

export function Activity({ githubId }: ActivityProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { data, isLoading } = UserReactQueryAdapter.client.useGetUserStats({
    pathParams: { githubId },
    options: {
      enabled: !!githubId,
    },
  });

  const weekData = useMemo(() => {
    const _weekData: ActivityGraphWeeksData<unknown> = {};

    const levelRange = getLevelRange(
      data?.activity?.map(activity => activity.issueCount + activity.codeReviewCount + activity.pullRequestCount) || []
    );

    data?.activity.forEach(activity => {
      const contributionCount = activity.issueCount + activity.codeReviewCount + activity.pullRequestCount;
      _weekData[getWeekId(dateKernelPort.getDateFromWeekNumber(activity.year, activity.week))] = {
        level: getLevelFromCount(levelRange, contributionCount),
        icon: activity.rewardCount > 0 ? { component: Medal } : undefined,
        tooltipContent: `${contributionCount} contributions • ${activity.rewardCount} rewards`,
      };
    });

    return _weekData;
  }, [data]);

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.activity.title" }} />
      <ActivityGraph weekData={weekData} isLoading={isLoading} />
    </Paper>
  );
}

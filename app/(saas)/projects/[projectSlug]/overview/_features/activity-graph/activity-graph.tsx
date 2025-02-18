import { setDay, setWeek, setYear } from "date-fns";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ActivityGraph as ActivityGraphComponent } from "@/shared/features/contributors/activity-graph/activity-graph";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

export function ActivityGraph({ projectIdOrSlug }: { projectIdOrSlug: string }) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectActivityBySlugOrId({
    pathParams: { projectIdOrSlug },
  });

  const formated = useMemo(() => {
    return data?.days.map(day => ({
      ...day,
      date: setYear(setWeek(setDay(new Date(), day.day), day.week), day.year),
      count: (day.rewardCount || 0) + (day.codeReviewCount || 0) + (day.issueCount || 0) + (day.pullRequestCount || 0),
      hasReward: day.rewardCount > 0,
    }));
  }, [data]);

  return (
    <Card className={"relative flex w-full flex-col gap-4 overflow-hidden p-4"}>
      <TypographyH3>Github Activity</TypographyH3>
      <ActivityGraphComponent data={formated} />
    </Card>
  );
}

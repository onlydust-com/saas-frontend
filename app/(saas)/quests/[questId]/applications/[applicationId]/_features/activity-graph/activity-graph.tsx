import { setDay, setWeek, setYear } from "date-fns";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ActivityGraph as ActivityGraphComponent } from "@/shared/features/contributors/activity-graph/activity-graph";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

export function ActivityGraph({ githubLogin }: { githubLogin: string }) {
  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorActivityById({
    pathParams: { contributorIdOrLogin: githubLogin },
    queryParams: {
      dataSource: "ALL",
    },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card className={"relative flex w-full flex-col gap-4 overflow-hidden p-4"}>
      <TypographyH3>Github Activity</TypographyH3>
      <ActivityGraphComponent data={data?.days} />
    </Card>
  );
}

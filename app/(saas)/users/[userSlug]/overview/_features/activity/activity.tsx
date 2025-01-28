import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Accordion } from "@/design-system/molecules/accordion";

import { ActivityGraph } from "@/shared/features/contributors/activity-graph/activity-graph";

import { ActivityProps } from "./activity.types";

export function Activity({ userId }: ActivityProps) {
  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorActivityById({
    pathParams: { contributorId: userId },
    queryParams: {
      dataSource: "ALL",
    },
    options: {
      enabled: !!userId,
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!data) {
    return null;
  }

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
          translate: { token: "panels:contributor.activity.title", values: { number: data?.totalCount || 0 } },
        }}
      >
        <div className="flex w-full flex-col gap-4">
          <ActivityGraph data={data?.days} />
        </div>
      </Accordion>
    </div>
  );
}

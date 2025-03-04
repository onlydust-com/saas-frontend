import { Categories } from "@/app/(saas)/discover/_features/categories/categories";
import { GoodFirstIssues } from "@/app/(saas)/discover/_features/good-first-issues/good-first-issues";
import { MostCollaborative } from "@/app/(saas)/discover/_features/most-collaborative/most-collaborative";
import { RecentActivity } from "@/app/(saas)/discover/_features/recent-activity/recent-activity";
import { Trending } from "@/app/(saas)/discover/_features/trending/trending";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

export default function DiscoverPageV1() {
  return (
    <PageContainer>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Discover",
          },
        ]}
      />

      <div className="flex flex-col gap-16 pt-10">
        <GoodFirstIssues />

        {/* <News /> */}

        <Categories />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <Trending />

          <MostCollaborative />

          <RecentActivity />
        </div>
      </div>
    </PageContainer>
  );
}

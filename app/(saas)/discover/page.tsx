import { Categories } from "@/app/(saas)/discover/_features/categories/categories";
import { GoodFirstIssues } from "@/app/(saas)/discover/_features/good-first-issues/good-first-issues";
import { MostCollaborative } from "@/app/(saas)/discover/_features/most-collaborative/most-collaborative";
import { News } from "@/app/(saas)/discover/_features/news/news";
import { RecentActivity } from "@/app/(saas)/discover/_features/recent-activity/recent-activity";
import { Trending } from "@/app/(saas)/discover/_features/trending/trending";

import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";

export default function DiscoverPage() {
  return (
    <PageWrapper containerSize="small" shouldScroll>
      <div className="flex flex-col gap-16 py-6">
        <Categories />

        <GoodFirstIssues />

        <News />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <Trending />

          <MostCollaborative />

          <RecentActivity />
        </div>
      </div>
    </PageWrapper>
  );
}

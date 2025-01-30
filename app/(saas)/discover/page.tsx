import Section from "@/app/(saas)/discover/_components/section/section";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";

export default function DiscoverPage() {
  return (
    <PageWrapper containerSize="small" shouldScroll>
      <div className="flex flex-col gap-16 py-6">
        <Section title="Categories" seeAll={NEXT_ROUTER.categories.root}>
          <div>Section</div>
        </Section>

        <Section title="Good first issues">
          <div>Section</div>
        </Section>

        <Section title="News">
          <div>Section</div>
        </Section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Section title="Trending">
            <div>Section</div>
          </Section>

          <Section title="Most collaborative">
            <div>Section</div>
          </Section>

          <Section title="Recently active">
            <div>Section</div>
          </Section>
        </div>
      </div>
    </PageWrapper>
  );
}

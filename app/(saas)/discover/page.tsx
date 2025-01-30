import { type Metadata } from "next";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";

import { ActualitySection } from "./_features/actuality-section/actuality-section";
import { CategoriesSection } from "./_features/categories-section/categories-section";
import { GoodFirstIssuesSection } from "./_features/good-first-issues-section/good-first-issues-section";
import { ProjectsSections } from "./_features/projects-sections/projects-sections";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover open source projects and contributions",
};

export default function DiscoverPage() {
  return (
    <PageWrapper containerSize="small" shouldScroll>
      <div className="mx-auto flex flex-col gap-16 py-4xl">
        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Discover",
            },
          ]}
        />

        <CategoriesSection />
        <GoodFirstIssuesSection />
        <ActualitySection />
        <ProjectsSections />
      </div>
    </PageWrapper>
  );
}

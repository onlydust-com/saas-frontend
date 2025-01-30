"use client";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";

import { articles } from "./_data/articles.data";
import { CategoriesSection } from "./_features/categories/categories";
import { FeaturedProjectsSection } from "./_features/featured-projects/featured-projects";
import { LatestArticlesSection } from "./_features/latest-articles/latest-articles";
import { ProjectColumnsSection } from "./_features/project-columns/project-columns";

export default function DiscoverPage() {
  return (
    <PageWrapper containerSize="large">
      <AnimatedColumn className="h-full max-w-full">
        <ScrollView className="flex flex-col">
          <PageContent>
            <div className="flex h-full flex-col gap-24">
              <CategoriesSection />
              <FeaturedProjectsSection />
              <LatestArticlesSection articles={articles} />
              <ProjectColumnsSection />
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
}

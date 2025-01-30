'use client';

import { useMemo } from "react";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { categories } from "./_data/categories.data";
import { articles } from "./_data/articles.data";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";

import { CategoriesSection } from "./_features/categories/categories";
import { GoodFirstIssuesSection } from "./_features/good-first-issues/good-first-issues";
import { LatestArticlesSection } from "./_features/latest-articles/latest-articles";
import { ProjectColumnsSection } from "./_features/project-columns/project-columns";

export default function DiscoverPage() {
  // State
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      pageSize: 6,
      pageIndex: 0,
      hasGoodFirstIssues: true
    }
  });

  // Memoized values
  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  return (
    <PageWrapper containerSize="large">
      <AnimatedColumn className="h-full max-w-full">
        <ScrollView className="flex flex-col">
          <PageContent>
            <div className="flex h-full flex-col gap-24">
              <CategoriesSection categories={categories} />
              <GoodFirstIssuesSection 
                projects={projects}
                isLoading={isLoading}
                isError={isError}
              />
              <LatestArticlesSection articles={articles} />
              <ProjectColumnsSection projects={projects} />
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
} 
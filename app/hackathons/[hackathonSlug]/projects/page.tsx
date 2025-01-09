"use client";

import { useMemo } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function HackathonProjectsPage({ params }: { params: { hackathonSlug: string } }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    HackathonReactQueryAdapter.client.useGetHackathonProjectsV2({
      pathParams: {
        hackathonSlug: params.hackathonSlug,
      },
      options: {
        enabled: Boolean(params.hackathonSlug),
      },
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);
  const count = useMemo(() => data?.pages[0]?.totalItemNumber ?? 0, [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full py-40">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full py-40">
          <EmptyStateLite />
        </div>
      );
    }

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        availableIssueCount={project.availableIssueCount}
        goodFirstIssueCount={project.goodFirstIssueCount}
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
      />
    ));
  }, [isLoading, isError, projects]);

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: params.hackathonSlug,
          },
          {
            id: "projects",
            label: <Translate token={"hackathon:details.tabs.projects"} />,
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {renderProjects}
        {hasNextPage ? (
          <div className="col-span-full">
            <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
          </div>
        ) : null}
      </div>
    </ScrollView>
  );
}

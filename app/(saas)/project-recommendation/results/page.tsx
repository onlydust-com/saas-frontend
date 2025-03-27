"use client";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace/variants/card-project-marketplace-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useFeatureFlagVariant } from "@/shared/hooks/feature-flag/feature-flag.hooks";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { TypographyH3 } from "@/shared/ui/typography";

function ProjectRecommendationResultsPage() {
  const variantValue = useFeatureFlagVariant({
    flagName: "project-recommendation-a-a",
  });

  const { data: recommendedProjects, isLoading: isLoadingRecommendedProjects } =
    RecoReactQueryAdapter.client.useGetRecommendedProjects({
      queryParams: {
        v: variantValue ?? "",
      },
      options: {
        enabled: Boolean(variantValue),
      },
    });

  function renderContent() {
    if (isLoadingRecommendedProjects) {
      return (
        <>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              classNames={{
                base: "w-full min-h-[300px]",
              }}
            />
          ))}
        </>
      );
    }

    if (!recommendedProjects?.projects.length) {
      return (
        <div className="col-span-full">
          <EmptyState
            titleTranslate={{ token: "projectRecommendation:details.results.emptyState.title" }}
            descriptionTranslate={{
              token: "projectRecommendation:details.results.emptyState.description",
            }}
          />
        </div>
      );
    }

    return recommendedProjects?.projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.projects.details.root(project.slug) }}
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
        tags={project.tags}
      />
    ));
  }

  return (
    <div className="flex h-full flex-col items-center gap-xl overflow-hidden">
      <TypographyH3 className="text-center">Recommended projects for you</TypographyH3>

      <div className="grid gap-xl overflow-hidden md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-3xl">
        {renderContent()}
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticated(ProjectRecommendationResultsPage));

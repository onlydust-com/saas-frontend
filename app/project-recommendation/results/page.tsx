"use client";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace/variants/card-project-marketplace-default";

import { EmptyState } from "@/shared/components/empty-state/empty-state";

export default function ProjectRecommendationResultsPage() {
  const { data: recommendedProjects, isLoading: isLoadingRecommendedProjects } =
    RecoReactQueryAdapter.client.useGetRecommendedProjects({
      queryParams: {
        v: "REPLACE_WITH_POSTHOG_ALGO_ID",
      },
    });

  if (isLoadingRecommendedProjects) {
    return (
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            classNames={{
              base: "w-full min-h-[300px]",
            }}
          />
        ))}
      </div>
    );
  }

  if (!recommendedProjects?.projects.length) {
    return (
      <EmptyState
        titleTranslate={{ token: "projectRecommendation:details.results.emptyState.title" }}
        descriptionTranslate={{
          token: "projectRecommendation:details.results.emptyState.description",
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-xl">
      <Typo
        variant="heading"
        size="xs"
        weight="medium"
        translate={{
          token: "projectRecommendation:details.results.title",
        }}
      />
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {recommendedProjects?.projects.map(project => <CardProjectMarketplace key={project.id} {...project} />)}
      </div>
    </div>
  );
}

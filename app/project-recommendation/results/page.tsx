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

  function renderContent() {
    if (isLoadingRecommendedProjects) {
      return (
        <>
          {[...Array(3)].map((_, i) => (
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

    return recommendedProjects?.projects.map(project => <CardProjectMarketplace key={project.id} {...project} />);
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
      <div className="grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">{renderContent()}</div>
    </div>
  );
}

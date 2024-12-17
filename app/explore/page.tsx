"use client";

import { Section } from "@/app/explore/_components/section/section";
import { ProjectBanners } from "@/app/explore/_features/project-banners/project-banners";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { GlobalSearch } from "@/shared/features/global-search/global-search";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";
import { ContributorLeaderboard } from "./_features/contributor-leaderboard/contributor-leaderboard";
import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { ProjectLeaderboard } from "./_features/project-leaderboard/project-leaderboard";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

export default function ExplorePage() {
  return (
    <ScrollView>
      <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
        {process.env.NEXT_PUBLIC_ENABLE_GLOBAL_SEARCH !== "true" && <GlobalSearch byPassFlag={true} />}
        <ProjectBanners />

        <TrendingProjects />

        <Section
          title={{
            translate: { token: "explore:expertise.title" },
          }}
          description={{
            translate: { token: "explore:expertise.description" },
          }}
          classNames={{
            base: "gap-lg",
          }}
        >
          <div className="flex flex-col gap-6xl">
            <ProjectCategoryList />

            <div className="grid gap-xl tablet:grid-cols-2 laptop:gap-3xl">
              <ContributorLeaderboard />
              <ProjectLeaderboard />
            </div>
          </div>
        </Section>

        <BrowseProjects />
      </div>
    </ScrollView>
  );
}

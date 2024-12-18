"use client";

import { ProjectBanners } from "@/app/explore/_features/project-banners/project-banners";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { GlobalSearch } from "@/shared/features/global-search/global-search";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";
import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

export default function ExplorePage() {
  return (
    <ScrollView>
      <div className="mx-auto flex max-w-laptop flex-col gap-7xl py-4xl">
        {process.env.NEXT_PUBLIC_ENABLE_GLOBAL_SEARCH !== "true" && <GlobalSearch byPassFlag={true} />}
        <ProjectBanners />

        <TrendingProjects />

        <ProjectCategoryList />

        <BrowseProjects />
      </div>
    </ScrollView>
  );
}

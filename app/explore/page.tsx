"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ProjectBanners } from "@/app/explore/_features/project-banners/project-banners";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { GlobalSearch } from "@/shared/features/global-search/global-search";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";
import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

function ExplorePage() {
  return (
    <ScrollView className="pb-7xl">
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

export default withClientOnly(withAuthenticationRequired(ExplorePage));

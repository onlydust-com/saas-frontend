"use client";

import { Typo } from "@/design-system/atoms/typo";

import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <section className="flex flex-col gap-lg">
        <div className="flex flex-col gap-md">
          <div>
            <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:trending.title" }} />{" "}
            <Typo variant="heading" size="xs" weight="medium" color="tertiary">
              {/* TODO @hayden get the number of trending projects */}
              (100)
            </Typo>
          </div>
          <Typo color="secondary" size="xs" translate={{ token: "explore:trending.description" }} />
        </div>

        <TrendingProjects />
      </section>

      <section className="flex flex-col gap-lg">
        <div className="flex flex-col gap-md">
          <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:expertise.title" }} />
          <Typo color="secondary" size="xs" translate={{ token: "explore:expertise.description" }} />
        </div>
        <ProjectCategoryList />
      </section>
    </div>
  );
}

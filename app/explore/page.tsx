"use client";

import { Typo } from "@/design-system/atoms/typo";

import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { ProjectLeaderboard } from "./_features/project-leaderboard/project-leaderboard";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <Typo variant="heading" size="xl" translate={{ token: "explore:title" }} />
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col gap-md">
          <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:expertise.title" }} />
          <Typo color="secondary" size="xs" translate={{ token: "explore:expertise.description" }} />
        </div>
        <ProjectCategoryList />
      </div>
      <div className="grid grid-cols-2 gap-xl">
        <ProjectLeaderboard />
      </div>
    </div>
  );
}

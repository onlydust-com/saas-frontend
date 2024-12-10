"use client";

import { Typo } from "@/design-system/atoms/typo";

export default function ProjectRecommendationPage() {
  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <div className="flex flex-col items-center gap-md">
        <Typo
          variant="heading"
          size="xs"
          weight="medium"
          translate={{
            token: "projectRecommendation:commons.header.title",
          }}
        />
        <Typo
          color="secondary"
          size="xs"
          translate={{
            token: "projectRecommendation:commons.header.description",
          }}
        />
      </div>

      {/* Add your content here */}
    </div>
  );
}

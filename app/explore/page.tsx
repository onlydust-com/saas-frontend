"use client";

import { Typo } from "@/design-system/atoms/typo";

import { ExpertiseSection } from "./_components/expertise/expertise-section";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <Typo variant="heading" size="xl" translate={{ token: "explore:title" }} />
      <ExpertiseSection />
    </div>
  );
}

"use client";

import { Typo } from "@/design-system/atoms/typo";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <Typo variant="heading" size="xl" translate={{ token: "explore:title" }} />
    </div>
  );
}

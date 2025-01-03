"use client";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Markdown } from "@/shared/features/markdown/markdown";

export default function HackathonOverviewPage() {
  return (
    <div className="overflow-hidden p-lg">
      <h1>Hackathon Overview</h1>
      <ScrollView>
        <Markdown content={"# Hello World"} />
      </ScrollView>
    </div>
  );
}

"use client";

import { useState } from "react";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

import Chat from "./_features/chat/chat";
import Projects from "./_features/projects/projects";

export default function ODSay() {
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [issueIds, setIssueIds] = useState<number[]>([]);

  const onSuggestionChange = (projectIds: string[], issueIds: number[]) => {
    setProjectIds(projectIds);
    setIssueIds(issueIds);
  };

  return (
    <PageContainer size="medium" className="flex h-screen flex-col">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "OD-Say",
          },
        ]}
      />
      <div className="flex min-h-0 w-full flex-1 gap-16 pt-10">
        <div className="w-1/3 overflow-y-auto">
          <Chat onSuggestionChange={onSuggestionChange} />
        </div>
        <div className="w-2/3 overflow-y-auto">
          <Projects />
        </div>
      </div>
    </PageContainer>
  );
}

"use client";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

import Chat from "./_features/chat/chat";
import Projects from "./_features/projects/projects";

export default function ODSay() {
  return (
    <PageContainer size="medium" className="flex">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "OD-Say",
          },
        ]}
      />
      <div className="flex gap-16 pt-10">
        <Chat />
        <Projects />
      </div>
    </PageContainer>
  );
}

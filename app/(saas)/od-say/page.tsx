"use client";

import { useLayoutEffect } from "react";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

import Chat from "./_features/chat/chat";

function ODSay() {
  useLayoutEffect(() => {
    document.querySelector(".page-container")?.classList.remove("pb-20");

    return () => {
      document.querySelector(".page-container")?.classList.add("pb-20");
    };
  }, []);

  return (
    <PageContainer size="large" className="flex-1">
      <PosthogCaptureOnMount eventName={"project_recommendation_chat_viewed"} />
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "OD-Say",
          },
        ]}
      />
      <Chat />
      <ProjectSidepanel />
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(ODSay));

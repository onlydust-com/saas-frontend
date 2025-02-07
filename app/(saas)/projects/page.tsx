"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";

function ProjectsPage() {
  return (
    <PageContainer>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Projects",
          },
        ]}
      />

      <div className="pt-10">
        <BrowseProjects />
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(ProjectsPage));

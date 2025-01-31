"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";

function ProjectsPage() {
  return (
    <PageWrapper containerSize="small" shouldScroll>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Projects",
          },
        ]}
      />

      <div className="py-6">
        <BrowseProjects />
      </div>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticated(ProjectsPage));

import { PageContainer } from "@/app/(lite)/_shared/components/page/page-container";
import { PageHeader } from "@/app/(lite)/_shared/components/page/page-header";
import { PageTitle } from "@/app/(lite)/_shared/components/page/page-title";
import { ProjectList } from "@/app/(lite)/maintainer/projects/_local/project-list";

import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";

export default function MaintainerProjectsPage() {
  return (
    <PageContainer>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            label: "Maintainer",
          },
          {
            label: "Projects",
          },
        ]}
      />

      <div className="flex flex-col gap-6">
        <PageHeader>
          <PageTitle title="My Projects" />
        </PageHeader>

        <ProjectList />
      </div>
    </PageContainer>
  );
}

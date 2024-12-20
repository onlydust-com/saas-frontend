"use client";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProjectIssuesPage({ params }: { params: { projectSlug: string } }) {
  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: params.projectSlug,
          },
          {
            id: "open-issues",
            label: <Translate token={"project:details.tabs.openIssues"} />,
          },
        ]}
      />
      <div>content</div>
    </ScrollView>
  );
}

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ProjectsTable } from "@/app/maintainer/features/projects-table/projects-table";

import { Typo } from "@/design-system/atoms/typo";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

function MaintainerPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"maintainer:list.header.title"} />,
          },
        ],
      }}
    >
      <ScrollView>
        <PageContent>
          <div className="grid h-full gap-3">
            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              translate={{
                token: "maintainer:list.projectsTable.title",
              }}
            />
            <ProjectsTable />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MaintainerPage));

"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ChevronRight } from "lucide-react";

import { ProjectsTable } from "@/app/manage-projects/_features/projects-table/projects-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { Translate } from "@/shared/translation/components/translate/translate";

function ManageProjectsPage() {
  return (
    <PageWrapper>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"manageProjects:list.header.title"} />,
          },
        ]}
      />
      <ScrollView>
        <PageContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-2">
              <Typo
                size={"xs"}
                weight={"medium"}
                variant={"heading"}
                translate={{
                  token: "manageProjects:list.projectsTable.title",
                }}
              />
              <Button
                as={BaseLink}
                htmlProps={{
                  href: marketplaceRouting("/p/create"),
                }}
                variant={"primary"}
                endIcon={{ component: ChevronRight }}
                isTextButton
                size={"md"}
                translate={{ token: "manageProjects:list.header.ctaSubmitProject" }}
                classNames={{
                  base: "max-w-full overflow-hidden",
                  label: "whitespace-nowrap text-ellipsis overflow-hidden",
                }}
              />
            </div>

            <ProjectsTable />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(ManageProjectsPage));

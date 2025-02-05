"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { ProjectsTable } from "@/app/(saas)/manage-projects/_features/projects-table/projects-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { useShowProjectsList } from "@/shared/hooks/projects/use-show-projects-list";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

function withProjectList<P extends object>(Component: ComponentType<P>) {
  return function WithProjectList(props: P) {
    const [showProjectList] = useShowProjectsList();
    const router = useRouter();

    useEffect(() => {
      if (showProjectList.loading) return;

      if (!showProjectList.hasMultipleProjects && showProjectList.firstProject) {
        router.push(NEXT_ROUTER.manageProjects.default.root(showProjectList.firstProject));
      }
    }, [showProjectList, router]);

    if (showProjectList.loading) {
      return null;
    }

    return <Component {...props} />;
  };
}

function ManageProjectsPage() {
  return (
    <PageContainer size="medium">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"manageProjects:list.header.title"} />,
          },
        ]}
      />

      <PageContent classNames={{ base: "h-full" }}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
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
              endIcon={{ component: SquareArrowOutUpRight }}
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
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(withProjectList(ManageProjectsPage)));

"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { ProgramsTable } from "@/app/(saas)/programs/_features/programs-table/programs-table";

import { Typo } from "@/design-system/atoms/typo";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useShowProgramsList } from "@/shared/hooks/programs/use-show-programs-list";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

function withProgramList<P extends object>(Component: ComponentType<P>) {
  return function WithProgramList(props: P) {
    const [showProgramList] = useShowProgramsList();
    const router = useRouter();

    useEffect(() => {
      if (showProgramList.loading) return;

      if (!showProgramList.hasMultiplePrograms && showProgramList.firstProgram) {
        router.push(NEXT_ROUTER.programs.projects.root(showProgramList.firstProgram));
      }
    }, [showProgramList, router]);

    if (showProgramList.loading) {
      return null;
    }

    return <Component {...props} />;
  };
}

function ProgramsPage() {
  return (
    <PageContainer size="medium" className="flex-1">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
          },
        ]}
      />

      <PageContent classNames={{ base: "h-full" }}>
        <div className="flex h-full flex-col gap-4">
          <Typo
            size={"xs"}
            weight={"medium"}
            variant={"heading"}
            translate={{
              token: "programs:list.content.title",
            }}
          />

          <ProgramsTable />
        </div>
      </PageContent>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(withProgramList(ProgramsPage)));

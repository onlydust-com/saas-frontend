"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ProgramsTable } from "@/app/programs/_features/programs-table/programs-table";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProgramsPage() {
  const router = useRouter();
  const { data } = ProgramReactQueryAdapter.client.useGetPrograms({});

  useEffect(() => {
    const flatPrograms = data?.pages.flatMap(page => page.programs);

    if (!flatPrograms?.length) return;

    if (flatPrograms?.length && flatPrograms?.length === 1) {
      router.push(NEXT_ROUTER.programs.details.root(flatPrograms[0].id));
    }
  }, [data, router]);

  return (
    <PageWrapper
      navigation={{
        title: <Translate token={"programs:list.header.title"} />,
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
                token: "programs:list.content.title",
              }}
            />

            <ProgramsTable />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

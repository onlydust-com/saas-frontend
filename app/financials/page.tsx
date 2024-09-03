"use client";

import { ProgramsTable } from "@/app/programs/_features/programs-table/programs-table";

import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProgramsPage() {
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

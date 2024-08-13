"use client";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProgramsPage() {
  const { data } = ProgramReactQueryAdapter.client.useGetPrograms({});
  const programs = data?.pages.flatMap(page => page.programs) || [];
  return (
    <PageWrapper
      navigation={{
        iconName: "ri-clipboard-line",
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"programs:details.header.title"} />,
          },
        ],
      }}
    >
      <PageContent>
        <div className="flex flex-1 flex-col gap-3">
          {programs.map(program => (
            <div key={program.name}>
              <BaseLink href={NEXT_ROUTER.programs.details.root(program.id)}>{program.name}</BaseLink>
            </div>
          ))}
        </div>
      </PageContent>
    </PageWrapper>
  );
}

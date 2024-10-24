import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { AccordionNewContributorsProps } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/accordion-new-contributors/accordion-new-contributors.types";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

export function AccordionNewContributors({ contributionId = "", queryParams, columns }: AccordionNewContributorsProps) {
  const { open: openContributor } = useContributorSidePanel();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    IssueReactQueryAdapter.client.useGetIssueApplicants({
      pathParams: { contributionUuid: contributionId },
      queryParams: { ...queryParams, isApplicantProjectMember: false },
      options: { enabled: !!contributionId },
    });

  const applicants = useMemo(() => data?.pages.flatMap(page => page.applicants) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber ?? 0, [data]);

  const table = useReactTable({
    data: applicants,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return (
      <div className={"py-24 text-center"}>
        <Typo
          translate={{
            token: "common:state.error.title",
          }}
        />
      </div>
    );
  }
  return (
    <Accordion
      id={"new-contributors"}
      titleProps={{
        children: (
          <div className={"flex items-center gap-md"}>
            <Typo translate={{ token: "modals:manageApplicants.newContributors" }} size={"sm"} />
            <Badge size={"xxs"} color={"grey"}>
              {totalItemNumber}
            </Badge>
          </div>
        ),
      }}
    >
      <ScrollView direction={"x"}>
        <Table
          header={{
            headerGroups: table.getHeaderGroups(),
          }}
          rows={table.getRowModel().rows}
          classNames={{
            base: "min-w-[1200px]",
          }}
          onRowClick={row => {
            openContributor({ githubId: row.original.contributor.githubUserId });
          }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </Accordion>
  );
}

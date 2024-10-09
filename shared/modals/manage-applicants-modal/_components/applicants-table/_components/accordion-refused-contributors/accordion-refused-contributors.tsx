import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { AccordionRefusedContributorsProps } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/accordion-refused-contributors/accordion-refused-contributors.types";

export function AccordionRefusedContributors({ projectId, queryParams, columns }: AccordionRefusedContributorsProps) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ApplicationReactQueryAdapter.client.useGetApplications({
      queryParams: { ...queryParams, isIgnored: true },
      options: { enabled: !!projectId },
    });

  const applications = useMemo(() => data?.pages.flatMap(page => page.applications) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages.flatMap(page => page.totalItemNumber) ?? [], [data]);

  const table = useReactTable({
    data: applications,
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
      id={"refused-contributors"}
      titleProps={{
        children: (
          <div className={"flex items-center gap-md"}>
            <Typo translate={{ token: "modals:manageApplicants.refused" }} size={"sm"} />
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
          // onRowClick={row => {
          //   alert(row.original.id);
          // }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </Accordion>
  );
}

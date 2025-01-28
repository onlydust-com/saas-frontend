import { useMemo } from "react";
import { toast } from "sonner";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { TransactionsAccordion } from "@/shared/features/transactions/transactions-accordion/transactions-accordion";
import { TransactionsFilters } from "@/shared/features/transactions/transactions-filters/transactions-filters";
import {
  SortDirection,
  TransactionsFiltersProps,
} from "@/shared/features/transactions/transactions-filters/transactions-filters.types";
import { ExportCsvSidepanel } from "@/shared/panels/export-csv-sidepanel/export-csv-sidepanel";
import { useExportCsvSidepanel } from "@/shared/panels/export-csv-sidepanel/export-csv-sidepanel.hooks";
import { AccordionTransactions } from "@/shared/panels/project-transactions-sidepanel/_components/accordion-transactions/accordion-transactions";
import {
  ProjectTransactionsContextProvider,
  useProjectTransactionsContext,
} from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.context";
import { useProjectTransactionsSidepanel } from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.hooks";
import {
  ProjectTransactionsContextFilterTypes,
  ProjectTransactionsSidepanelProps,
} from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

function Safe() {
  const { name } = useProjectTransactionsSidepanel();
  const { Panel } = useSidePanel({ name });
  const { open: openExportCsv } = useExportCsvSidepanel();

  const {
    projectSlug,
    queryParams,
    monthlyTransactions,
    isLoadingTransactions,
    filters: {
      count,
      set,
      clear,
      isCleared,
      values: { search, types, sortDirection, dateRange },
      options: { types: typesOptions },
    },
  } = useProjectTransactionsContext();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const { mutate, isPending } = ProjectReactQueryAdapter.client.useGetProjectTransactionsCsv({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    queryParams: {
      ...queryParams,
      pageIndex: 0,
      pageSize: 10000,
    },
    options: {
      onSuccess: data => {
        fileKernelPort.download({
          blob: data,
          name: `${projectSlug}-transactions-${new Date().getTime()}`,
          extension: "csv",
        });

        toast.success(<Translate token="panels:projectTransactions.export.tooltip.success" />);
      },
      onError: () => {
        toast.error(<Translate token="panels:projectTransactions.export.tooltip.error" />);
      },
    },
  });

  function handleTypes(newType: ProjectTransactionsContextFilterTypes, checked: boolean) {
    if (checked) {
      set({ types: [...types, newType] });
    } else {
      set({ types: types.filter(type => type !== newType) });
    }
  }

  function handleSort(direction: SortDirection) {
    set({ sortDirection: direction });
  }

  function handleDateRange(value: DateRangePickerValue) {
    set({ dateRange: value });
  }

  function handleSearch(value: string) {
    set({ search: value });
  }

  function handleExport() {
    mutate({});
  }

  const typeFilters: TransactionsFiltersProps["types"] = useMemo(
    () =>
      typesOptions.map(type => ({
        label: `panels:projectTransactions.filters.options.types.choices.${type}`,
        value: types.includes(type),
        onChange: (checked: boolean) => handleTypes(type, checked),
      })),
    [typesOptions, types]
  );

  return (
    <>
      <Panel>
        <SidePanelHeader
          title={{
            translate: { token: "panels:projectTransactions.title" },
          }}
          endContent={
            <Button
              variant="secondary"
              size="md"
              onClick={() => openExportCsv()}
              translate={{
                token: "panels:projectTransactions.export.title",
              }}
            />
          }
          canClose
          onClose={clear}
        />

        <SidePanelBody>
          <TransactionsFilters
            filters={{
              count,
              clear,
              isCleared,
            }}
            types={typeFilters}
            dateRange={dateRange}
            onDateRange={handleDateRange}
            sortDirection={sortDirection}
            onSort={handleSort}
            search={search}
            onSearch={handleSearch}
          />

          <TransactionsAccordion
            monthlyTransactions={
              monthlyTransactions?.stats.map(({ date, transactionCount }) => ({ date, count: transactionCount })) ?? []
            }
            ContentComponent={AccordionTransactions}
            isLoading={isLoadingTransactions}
          />
        </SidePanelBody>
      </Panel>

      <ExportCsvSidepanel
        types={typeFilters}
        dateRange={dateRange}
        onDateRange={handleDateRange}
        exportedData={[
          "panels:projectTransactions.export.data.columns.id",
          "panels:projectTransactions.export.data.columns.timestamp",
          "panels:projectTransactions.export.data.columns.transactionType",
          "panels:projectTransactions.export.data.columns.depositStatus",
          "panels:projectTransactions.export.data.columns.programId",
          "panels:projectTransactions.export.data.columns.amount",
          "panels:projectTransactions.export.data.columns.currency",
          "panels:projectTransactions.export.data.columns.usdAmount",
        ]}
        onExport={handleExport}
        isPending={isPending}
        canGoBack
        onClose={clear}
      />
    </>
  );
}

export function ProjectTransactionsSidepanel({ projectSlug }: ProjectTransactionsSidepanelProps) {
  return (
    <ProjectTransactionsContextProvider projectSlug={projectSlug}>
      <Safe />
    </ProjectTransactionsContextProvider>
  );
}

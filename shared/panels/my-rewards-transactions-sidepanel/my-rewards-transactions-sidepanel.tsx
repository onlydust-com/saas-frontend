import { useMemo } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { toast } from "@/design-system/molecules/toaster";

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
import {
  MyRewardsTransactionsContextProvider,
  useMyRewardsTransactionsContext,
} from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.context";
import { useMyRewardsTransactionsSidepanel } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.hooks";
import { MyRewardsTransactionsContextFilterTypes } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";
import { AccordionTransactions } from "@/shared/panels/my-rewards-transactions-sidepanel/_components/accordion-transactions/accordion-transactions";

function Safe() {
  const { name } = useMyRewardsTransactionsSidepanel();
  const { Panel } = useSidePanel({ name });
  const { open: openExportCsv } = useExportCsvSidepanel();

  const {
    githubUserId,
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
  } = useMyRewardsTransactionsContext();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const { mutate, isPending } = RewardReactQueryAdapter.client.useGetRewardsCsv({
    queryParams: {
      ...queryParams,
      recipientIds: [githubUserId],
      pageIndex: 0,
      pageSize: 10000,
    },
    options: {
      onSuccess: data => {
        fileKernelPort.download({
          blob: data,
          name: `my-rewards-transactions-${new Date().getTime()}`,
          extension: "csv",
        });

        toast.success(<Translate token="panels:myRewardsTransactions.export.tooltip.success" />);
      },
      onError: () => {
        toast.error(<Translate token="panels:myRewardsTransactions.export.tooltip.error" />);
      },
    },
  });

  function handleTypes(newType: MyRewardsTransactionsContextFilterTypes, checked: boolean) {
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
        label: `panels:myRewardsTransactions.filters.options.types.choices.${type}`,
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
            translate: { token: "panels:myRewardsTransactions.title" },
          }}
          endContent={
            <Button
              variant="secondary"
              size="md"
              onClick={() => openExportCsv()}
              translate={{
                token: "panels:myRewardsTransactions.export.title",
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
          "panels:myRewardsTransactions.export.data.columns.id",
          "panels:myRewardsTransactions.export.data.columns.status",
          "panels:myRewardsTransactions.export.data.columns.requestAt",
          "panels:myRewardsTransactions.export.data.columns.invoicedAt",
          "panels:myRewardsTransactions.export.data.columns.processedAt",
          "panels:myRewardsTransactions.export.data.columns.unlockDate",
          "panels:myRewardsTransactions.export.data.columns.requestor",
          "panels:myRewardsTransactions.export.data.columns.recipient",
          "panels:myRewardsTransactions.export.data.columns.projectId",
          "panels:myRewardsTransactions.export.data.columns.billingProfileId",
          "panels:myRewardsTransactions.export.data.columns.invoiceId",
          "panels:myRewardsTransactions.export.data.columns.invoiceNumber",
          "panels:myRewardsTransactions.export.data.columns.amount",
          "panels:myRewardsTransactions.export.data.columns.currencyCode",
          "panels:myRewardsTransactions.export.data.columns.usdAmount",
          "panels:myRewardsTransactions.export.data.columns.transactionReference",
          "panels:myRewardsTransactions.export.data.columns.transactionReferenceLink",
        ]}
        onExport={handleExport}
        isPending={isPending}
        canGoBack
        onClose={clear}
      />
    </>
  );
}

export function MyRewardsTransactionsSidepanel() {
  return (
    <MyRewardsTransactionsContextProvider>
      <Safe />
    </MyRewardsTransactionsContextProvider>
  );
}

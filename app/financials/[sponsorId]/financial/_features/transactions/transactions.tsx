import { useMemo } from "react";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";
import { toast } from "@/design-system/molecules/toaster";

import { TransactionsAccordion } from "@/shared/features/transactions/transactions-accordion/transactions-accordion";
import { TransactionsFilters } from "@/shared/features/transactions/transactions-filters/transactions-filters";
import {
  SortDirection,
  TransactionsFiltersProps,
} from "@/shared/features/transactions/transactions-filters/transactions-filters.types";
import { TransactionsHeader } from "@/shared/features/transactions/transactions-header/transactions-header";
import { ExportCsvSidepanel } from "@/shared/panels/export-csv-sidepanel/export-csv-sidepanel";
import { useExportCsvSidepanel } from "@/shared/panels/export-csv-sidepanel/export-csv-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TransactionsWrapper } from "./_components/transactions-wrapper/transactions-wrapper";
import { useTransactionsContext } from "./context/transactions.context";
import { TransactionsContextFilterTypes } from "./context/transactions.context.types";

export function Transactions() {
  const {
    sponsorId,
    queryParams,
    monthlyTransactions,
    filters: {
      count,
      set,
      clear,
      isCleared,
      values: { search, types, sortDirection, dateRange },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  const { open: openExportCsv } = useExportCsvSidepanel();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const { mutate, isPending } = SponsorReactQueryAdapter.client.useGetSponsorTransactionsCsv({
    pathParams: {
      sponsorId,
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
          name: `sponsors-transactions-${new Date().getTime()}`,
          extension: "csv",
        });

        toast.success(<Translate token="financials:transactions.export.tooltip.success" />);
      },
      onError: () => {
        toast.error(<Translate token="financials:transactions.export.tooltip.error" />);
      },
    },
  });

  function handleTypes(newType: TransactionsContextFilterTypes, checked: boolean) {
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
        label: `financials:transactions.filters.options.types.choices.${type}`,
        value: types.includes(type),
        onChange: (checked: boolean) => handleTypes(type, checked),
      })),
    [typesOptions, types]
  );

  return (
    <>
      <Paper
        border="primary"
        classNames={{
          base: "flex flex-col gap-lg h-full",
        }}
      >
        <TransactionsHeader count={monthlyTransactions?.transactionCount} />

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
          onOpenExport={openExportCsv}
        />

        <TransactionsAccordion
          monthlyTransactions={
            monthlyTransactions?.stats.map(({ date, transactionCount }) => ({ date, count: transactionCount })) ?? []
          }
          ContentComponent={TransactionsWrapper}
        />
      </Paper>

      <ExportCsvSidepanel
        types={typeFilters}
        dateRange={dateRange}
        onDateRange={handleDateRange}
        exportedData={[
          "financials:transactions.export.data.id",
          "financials:transactions.export.data.timestamp",
          "financials:transactions.export.data.transactionType",
          "financials:transactions.export.data.depositStatus",
          "financials:transactions.export.data.programId",
          "financials:transactions.export.data.amount",
          "financials:transactions.export.data.currency",
          "financials:transactions.export.data.usdAmount",
        ]}
        onExport={handleExport}
        isPending={isPending}
      />
    </>
  );
}

import { useMemo } from "react";
import { toast } from "sonner";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";

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
    programId,
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
  } = useTransactionsContext();

  const { open: openExportCsv } = useExportCsvSidepanel();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const { mutate, isPending } = ProgramReactQueryAdapter.client.useGetProgramTransactionsCsv({
    pathParams: {
      programId,
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
          name: `programs-transactions-${new Date().getTime()}`,
          extension: "csv",
        });

        toast.success(<Translate token="programs:transactions.export.tooltip.success" />);
      },
      onError: () => {
        toast.error(<Translate token="programs:transactions.export.tooltip.error" />);
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
        label: `programs:transactions.filters.options.types.choices.${type}`,
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
          isLoading={isLoadingTransactions}
        />
      </Paper>

      <ExportCsvSidepanel
        types={typeFilters}
        dateRange={dateRange}
        onDateRange={handleDateRange}
        exportedData={[
          "programs:transactions.export.data.id",
          "programs:transactions.export.data.timestamp",
          "programs:transactions.export.data.transactionType",
          "programs:transactions.export.data.projectId",
          "programs:transactions.export.data.sponsorId",
          "programs:transactions.export.data.amount",
          "programs:transactions.export.data.currency",
          "programs:transactions.export.data.usdAmount",
        ]}
        onExport={handleExport}
        isPending={isPending}
      />
    </>
  );
}

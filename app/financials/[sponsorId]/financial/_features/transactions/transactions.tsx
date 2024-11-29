import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";

import { TransactionsAccordion } from "@/shared/features/transactions/transactions-accordion/transactions-accordion";
import { TransactionsFilters } from "@/shared/features/transactions/transactions-filters/transactions-filters";
import { SortDirection } from "@/shared/features/transactions/transactions-filters/transactions-filters.types";
import { TransactionsHeader } from "@/shared/features/transactions/transactions-header/transactions-header";

import { TransactionsWrapper } from "./_components/transactions-wrapper/transactions-wrapper";
import { useTransactionsContext } from "./context/transactions.context";
import { TransactionsContextFilterTypes } from "./context/transactions.context.types";

export function Transactions() {
  const {
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

  return (
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
        types={typesOptions.map(type => ({
          label: `financials:transactions.filters.options.types.choices.${type}`,
          value: types.includes(type),
          onChange: (checked: boolean) => handleTypes(type, checked),
        }))}
        dateRange={dateRange}
        onDateRange={handleDateRange}
        sortDirection={sortDirection}
        onSort={handleSort}
        search={search}
        onSearch={handleSearch}
        onOpenExport={() => console.log("Export")}
      />

      <TransactionsAccordion
        monthlyTransactions={
          monthlyTransactions?.stats.map(({ date, transactionCount }) => ({ date, count: transactionCount })) ?? []
        }
        ContentComponent={TransactionsWrapper}
      />
    </Paper>
  );
}

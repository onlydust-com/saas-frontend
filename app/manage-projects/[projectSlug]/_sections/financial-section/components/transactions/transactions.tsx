import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { DateRangePickerValue } from "@/design-system/atoms/date-range-picker";

import { TransactionsSidepanel } from "@/shared/panels/transactions-sidepanel/transactions-sidepanel";

import {
  DEFAULT_FILTER,
  TransactionsFilter,
  TransactionsFilterType,
  TransactionsFilterTypes,
  TransactionsFiltersOptions,
  TransactionsQueryParams,
} from "./transactions.types";

export function Transactions() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const [filters, setFilters] = useState<TransactionsFilter>(DEFAULT_FILTER);
  const [queryParams, setQueryParams] = useState<TransactionsQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<TransactionsQueryParams>(queryParams);
  const [dataByAccordionKey, setDataByAccordionKey] = useState<Record<string, any>>({});

  const filtersOptions: TransactionsFiltersOptions = {
    types: [
      TransactionsFilterType.GRANTED,
      TransactionsFilterType.REWARDED,
      TransactionsFilterType.UNGRANTED,
      TransactionsFilterType.UNALLOCATED,
    ],
  };

  const fileKernelPort = bootstrap.getFileKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const projectStoragePortForClient = bootstrap.getProjectStoragePortForClient();

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      types: filters.types.length ? filters.types : undefined,
      fromDate: filters.dateRange?.start ? dateKernelPort.format(filters.dateRange.start, "yyyy-MM-dd") : undefined,
      toDate: filters.dateRange?.end ? dateKernelPort.format(filters.dateRange.end, "yyyy-MM-dd") : undefined,
    });
  }, [dateKernelPort, filters]);

  const { data: monthlyTransactions } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      ...debouncedQueryParams,
      sort: "DATE",
      sortDirection: "DESC",
      showEmpty: true,
      projectSlug,
    },
  });

  const { data, isLoading, refetch } = ProjectReactQueryAdapter.client.useGetProjectTransactions({
    pathParams: { projectIdOrSlug: projectSlug },
    queryParams: {
      ...queryParams,
      fromDate,
      toDate,
      pageSize: 100,
    },
    options: {
      enabled: false,
    },
  });

  async function handleAccordionOpen(accordionKey: string, fromDate: Date, toDate: Date) {
    if (dataByAccordionKey[accordionKey]) {
      return;
    }

    const formattedFromDate = dateKernelPort.format(fromDate, "yyyy-MM-dd");
    const formattedToDate = dateKernelPort.format(toDate, "yyyy-MM-dd");

    // TODO: Ne marche pas
    const result = await refetch({
      queryParams: {
        ...queryParams,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      },
    });

    if (result.data) {
      setDataByAccordionKey(prev => ({
        ...prev,
        [accordionKey]: result.data,
      }));
    }
  }

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.types.length + (filters.dateRange ? 1 : 0);
  }, [filters]);

  function setFilter(filter: Partial<TransactionsFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
  }

  function handleTypes(newType: TransactionsFilterTypes, checked: boolean) {
    if (checked) {
      setFilter({ types: [...filters.types, newType] });
    } else {
      setFilter({ types: filters.types.filter(type => type !== newType) });
    }
  }

  function handleDateRange(value: DateRangePickerValue) {
    setFilter({ dateRange: value });
  }

  function handleSearch(value: string) {
    setFilter({ search: value });
  }

  async function handleExport() {
    const data = await projectStoragePortForClient
      .getProjectTransactionsCsv({
        pathParams: { projectIdOrSlug: projectSlug },
        queryParams: {
          types: queryParams?.types,
          fromDate: queryParams?.fromDate,
          toDate: queryParams?.toDate,
          pageSize: 100,
          pageIndex: 0,
        },
      })
      .request();

    fileKernelPort.download({
      blob: data,
      name: `transactions-${new Date().getTime()}`,
      extension: "csv",
    });
  }

  return (
    <TransactionsSidepanel
      filters={{
        types: filtersOptions.types.map(type => ({
          label: `manageProjects:transactionPanel.filters.options.types.choices.${type}`,
          value: filters.types.includes(type),
          onChange: (checked: boolean) => handleTypes(type, checked),
        })),
        dateRange: filters.dateRange,
        onDateRange: handleDateRange,
        search: filters.search,
        onSearch: handleSearch,
        count: filtersCount,
        isCleared,
        clear: clearFilters,
      }}
      monthlyTransactions={
        monthlyTransactions?.stats.map(({ date, transactionCount }) => ({ date, count: transactionCount })) ?? []
      }
      dataByAccordionKey={dataByAccordionKey}
      onAccordionOpen={handleAccordionOpen}
      exportedData={[
        "manageProjects:transactionPanel.export.data.columns.id",
        "manageProjects:transactionPanel.export.data.columns.timestamp",
        "manageProjects:transactionPanel.export.data.columns.transactionType",
        "manageProjects:transactionPanel.export.data.columns.depositStatus",
        "manageProjects:transactionPanel.export.data.columns.programId",
        "manageProjects:transactionPanel.export.data.columns.amount",
        "manageProjects:transactionPanel.export.data.columns.currency",
        "manageProjects:transactionPanel.export.data.columns.usdAmount",
      ]}
      onExport={handleExport}
    />
  );
}

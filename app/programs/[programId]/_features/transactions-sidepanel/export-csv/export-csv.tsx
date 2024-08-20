import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { DateRangePicker } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { Translate } from "@/shared/translation/components/translate/translate";

import { useTransactionsContext } from "../context/transactions.context";
import { TransactionsContextFilterTypes } from "../context/transactions.context.types";

export function ExportCsv() {
  const {
    programId,
    queryParams,
    filters: {
      set,
      values: { types },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramTransactions({
    pathParams: { programId },
    queryParams: {
      ...queryParams,
      search: undefined,
      pageSize: 100,
    },
  });

  function handleTypes(newType: TransactionsContextFilterTypes, checked: boolean) {
    if (checked) {
      set({ types: [...types, newType] });
    } else {
      set({ types: types.filter(type => type !== newType) });
    }
  }

  const flatTransactions = useMemo(() => data?.pages.flatMap(({ transactions }) => transactions) ?? [], [data]);

  if (!flatTransactions.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <Paper container="transparent" size="s" classNames={{ base: "flex flex-col gap-3" }}>
        <Typo
          size="xs"
          weight="medium"
          translate={{ token: "programs:transactionPanel.filters.options.types.title" }}
        />

        <div className="flex flex-wrap gap-1">
          {typesOptions.map(type => (
            <CheckboxButton key={type} value={types.includes(type)} onChange={checked => handleTypes(type, checked)}>
              <Translate token={`programs:transactionPanel.filters.options.types.choices.${type}`} />
            </CheckboxButton>
          ))}
        </div>
      </Paper>

      <Paper container="transparent" size="s" classNames={{ base: "flex flex-col gap-3" }}>
        <Typo
          size="xs"
          weight="medium"
          translate={{ token: "programs:transactionPanel.filters.options.period.title" }}
        />

        <DateRangePicker />
      </Paper>
    </div>
  );
}

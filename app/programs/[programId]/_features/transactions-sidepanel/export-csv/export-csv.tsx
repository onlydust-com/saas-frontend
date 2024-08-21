import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useTransactionsContext } from "../context/transactions.context";
import { TransactionsContextFilterTypes } from "../context/transactions.context.types";

export function ExportCsv() {
  const {
    programId,
    queryParams,
    filters: {
      set,
      values: { types, dateRange },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const programStoragePortForClient = bootstrap.getProgramStoragePortForClient();

  function handleTypes(newType: TransactionsContextFilterTypes, checked: boolean) {
    if (checked) {
      set({ types: [...types, newType] });
    } else {
      set({ types: types.filter(type => type !== newType) });
    }
  }

  function handleDateRange(value: DateRangePickerValue) {
    set({ dateRange: value });
  }

  async function handleClick() {
    const data = await programStoragePortForClient
      .getProgramTransactionsCsv({
        pathParams: { programId },
        queryParams: {
          types: queryParams?.types,
          fromDate: queryParams?.fromDate,
          toDate: queryParams?.toDate,
          pageSize: 100,
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
    <div className="flex h-full flex-col gap-3">
      <div className="h-full">
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

          <DateRangePicker value={dateRange} onChange={handleDateRange} />
        </Paper>

        <Paper container="transparent" size="s" classNames={{ base: "flex flex-col gap-3" }}>
          <Typo size="xs" weight="medium" translate={{ token: "programs:transactionPanel.export.data.title" }} />

          <div className="flex flex-col gap-1">
            <Typo size="xxs" color="text-2" translate={{ token: "programs:transactionPanel.export.data.columns.id" }} />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.timestamp" }}
            />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.transactionType" }}
            />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.projectId" }}
            />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.sponsorId" }}
            />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.amount" }}
            />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.currency" }}
            />
            <Typo
              size="xxs"
              color="text-2"
              translate={{ token: "programs:transactionPanel.export.data.columns.usdAmount" }}
            />
          </div>
        </Paper>
      </div>

      <SidePanelFooter>
        <Button
          onClick={handleClick}
          translate={{
            token: "programs:transactionPanel.export.button",
          }}
          size="l"
          classNames={{ base: "w-full" }}
        />
      </SidePanelFooter>
    </div>
  );
}

import { useTransactionsContext } from "@/app/financials/[sponsorId]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context";
import { TransactionsContextFilterTypes } from "@/app/financials/[sponsorId]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context.types";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ExportCsv() {
  const {
    sponsorId,
    queryParams,
    filters: {
      set,
      values: { types, dateRange },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const sponsorStoragePortForClient = bootstrap.getSponsorStoragePortForClient();

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
    const data = await sponsorStoragePortForClient
      .getSponsorTransactionsCsv({
        pathParams: { sponsorId },
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
        <Paper background={"transparent"} size="sm" classNames={{ base: "flex flex-col gap-3" }}>
          <Typo
            size="xs"
            weight="medium"
            translate={{ token: "financials:transactionPanel.filters.options.types.title" }}
          />

          <div className="flex flex-wrap gap-1">
            {typesOptions.map(type => (
              <CheckboxButton key={type} value={types.includes(type)} onChange={checked => handleTypes(type, checked)}>
                <Translate token={`financials:transactionPanel.filters.options.types.choices.${type}`} />
              </CheckboxButton>
            ))}
          </div>
        </Paper>

        <Paper background={"transparent"} size="sm" classNames={{ base: "flex flex-col gap-3" }}>
          <Typo
            size="xs"
            weight="medium"
            translate={{ token: "financials:transactionPanel.filters.options.period.title" }}
          />

          <DateRangePicker value={dateRange} onChange={handleDateRange} />
        </Paper>

        <Paper background={"transparent"} size="sm" classNames={{ base: "flex flex-col gap-3" }}>
          <Typo size="xs" weight="medium" translate={{ token: "financials:transactionPanel.export.data.title" }} />

          <div className="flex flex-col gap-1">
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.id" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.timestamp" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.transactionType" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.depositStatus" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.programId" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.amount" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.currency" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "financials:transactionPanel.export.data.columns.usdAmount" }}
            />
          </div>
        </Paper>
      </div>

      <SidePanelFooter>
        <Button
          onClick={handleClick}
          translate={{
            token: "financials:transactionPanel.export.button",
          }}
          size="lg"
          classNames={{ base: "w-full" }}
        />
      </SidePanelFooter>
    </div>
  );
}

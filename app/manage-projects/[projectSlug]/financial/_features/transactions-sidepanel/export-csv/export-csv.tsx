import { useTransactionsContext } from "@/app/manage-projects/[projectSlug]/financial/_features/transactions-sidepanel/context/transactions.context";
import { TransactionsContextFilterTypes } from "@/app/manage-projects/[projectSlug]/financial/_features/transactions-sidepanel/context/transactions.context.types";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { DateRangePicker, DateRangePickerValue } from "@/design-system/atoms/date-range-picker";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ExportCsv() {
  const {
    projectSlug,
    queryParams,
    filters: {
      set,
      values: { types, dateRange },
      options: { types: typesOptions },
    },
  } = useTransactionsContext();

  const fileKernelPort = bootstrap.getFileKernelPort();

  const projectStoragePortForClient = bootstrap.getProjectStoragePortForClient();

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
    <>
      <SidePanelBody>
        <Accordion
          classNames={{ base: "flex flex-col gap-3" }}
          id={"types"}
          titleProps={{
            translate: { token: "manageProjects:transactionPanel.filters.options.types.title" },
            size: "xs",
            weight: "medium",
          }}
          defaultSelected={["types"]}
        >
          <div className="flex flex-wrap gap-1">
            {typesOptions.map(type => (
              <CheckboxButton key={type} value={types.includes(type)} onChange={checked => handleTypes(type, checked)}>
                <Translate token={`manageProjects:transactionPanel.filters.options.types.choices.${type}`} />
              </CheckboxButton>
            ))}
          </div>
        </Accordion>

        <Accordion
          classNames={{ base: "flex flex-col gap-3" }}
          id={"period"}
          titleProps={{
            translate: { token: "manageProjects:transactionPanel.filters.options.period.title" },
            size: "xs",
            weight: "medium",
          }}
          defaultSelected={["period"]}
        >
          <DateRangePicker
            label={
              <Typo
                size="xs"
                color="secondary"
                translate={{ token: "manageProjects:transactionPanel.filters.options.period.title" }}
              />
            }
            value={dateRange}
            onChange={handleDateRange}
          />
        </Accordion>

        <Accordion
          classNames={{ base: "flex flex-col gap-1" }}
          id={"data"}
          titleProps={{
            translate: { token: "manageProjects:transactionPanel.export.data.title" },
            size: "xs",
            weight: "medium",
          }}
          defaultSelected={["data"]}
        >
          <div className="flex flex-col gap-1">
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.id" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.timestamp" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.transactionType" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.depositStatus" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.programId" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.amount" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.currency" }}
            />
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "manageProjects:transactionPanel.export.data.columns.usdAmount" }}
            />
          </div>
        </Accordion>
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size="md"
          translate={{
            token: "manageProjects:transactionPanel.export.button",
          }}
          onClick={handleClick}
        />
      </SidePanelFooter>
    </>
  );
}

import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { ExportCsvSidepanel } from "./_components/export-csv-sidepanel/export-csv-sidepanel";
import { useExportCsvSidepanel } from "./_components/export-csv-sidepanel/export-csv-sidepanel.hooks";
import { Header } from "./_components/header/header";
import { TransactionsWrapper } from "./_components/transactions-wrapper/transactions-wrapper";
import { useTransactionsSidepanel } from "./transactions-sidepanel.hooks";
import { TransactionsSidepanelProps } from "./transactions-sidepanel.types";

export function TransactionsSidepanel({
  filters,
  monthlyTransactions,
  dataByAccordionKey,
  onAccordionOpen,
  exportedData,
  onExport,
}: TransactionsSidepanelProps) {
  const { name } = useTransactionsSidepanel();
  const { Panel } = useSidePanel({ name });

  const { open: openExportCsv } = useExportCsvSidepanel();

  const dateKernelPort = bootstrap.getDateKernelPort();

  const items: AccordionItemProps[] = useMemo(() => {
    return (
      monthlyTransactions?.map((transaction, index) => {
        const accordionKey = `monthly-transaction-${index}`;
        const { from, to } = dateKernelPort.getMonthRange(new Date(transaction.date));

        return {
          id: accordionKey,
          titleProps: {
            children: dateKernelPort.format(new Date(transaction.date), "MMMM yyyy"),
          },
          badgeProps: {
            children: transaction.count,
          },
          content: (
            <TransactionsWrapper
              data={dataByAccordionKey[accordionKey]}
              onOpen={() => onAccordionOpen(accordionKey, from, to)}
            />
          ),
        };
      }) || []
    );
  }, [dateKernelPort, monthlyTransactions, dataByAccordionKey]);

  return (
    <>
      <Panel>
        <SidePanelHeader
          title={{ translate: { token: "panels:transactions.transactions.title" } }}
          canClose
          endContent={
            <Button
              variant="secondary"
              size="md"
              onClick={openExportCsv}
              translate={{
                token: "panels:transactions.transactions.export",
              }}
            />
          }
          onClose={filters.clear}
        />

        <SidePanelBody>
          <div className="flex flex-col gap-lg">
            <Header filters={filters} />

            {!items.length ? (
              <EmptyStateLite
                title={"panels:transactions.transactions.empty.title"}
                message={"panels:transactions.transactions.empty.description"}
              />
            ) : (
              <Accordion
                classNames={{ base: "gap-lg" }}
                items={items}
                defaultSelected={items?.[0] ? [items?.[0].id] : undefined}
              />
            )}
          </div>
        </SidePanelBody>
      </Panel>

      <ExportCsvSidepanel filters={filters} exportedData={exportedData} onExport={onExport} />
    </>
  );
}

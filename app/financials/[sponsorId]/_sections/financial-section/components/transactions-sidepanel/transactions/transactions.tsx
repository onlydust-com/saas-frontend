import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";

import { useTransactionsContext } from "../context/transactions.context";
import { Header } from "./components/header/header";
import { TransactionsWrapper } from "./components/transactions-wrapper/transactions-wrapper";

export function Transactions() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { transactionsStats } = useTransactionsContext();

  const items: AccordionItemProps[] = useMemo(() => {
    return (
      transactionsStats?.map((t, index) => {
        return {
          id: `financials-transaction-stats-${index}`,
          titleProps: {
            children: dateKernelPort.format(new Date(t.date), "MMMM yyyy"),
          },
          badgeProps: {
            children: t.transactionCount,
          },
          content: <TransactionsWrapper date={new Date(t.date)} />,
        };
      }) || []
    );
  }, [dateKernelPort, transactionsStats]);

  return (
    <>
      <Header />

      {!items.length ? (
        <EmptyStateLite
          title={"financials:transactionPanel.transactions.empty.title"}
          message={"financials:transactionPanel.transactions.empty.description"}
        />
      ) : (
        <Accordion
          classNames={{ base: "gap-3" }}
          items={items}
          defaultSelected={items?.[0] ? [items?.[0].id] : undefined}
        />
      )}
    </>
  );
}

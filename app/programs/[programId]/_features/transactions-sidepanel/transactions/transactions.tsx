import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";
import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

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
          id: `transaction-stats-${index}`,
          titleProps: {
            children: dateKernelPort.format(new Date(t.date), "MMMM yyyy"),
          },
          badge: {
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
        <div className="flex flex-col items-center gap-1 py-4">
          <Typo variant="heading" translate={{ token: "programs:transactionPanel.transactions.empty.title" }} />
          <Typo size="sm" translate={{ token: "programs:transactionPanel.transactions.empty.description" }} />
        </div>
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

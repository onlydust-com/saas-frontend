import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";

import { useTransactionsContext } from "../context/transactions.context";
import { Header } from "./components/header/header";
import { TransactionsWrapper } from "./components/transactions-wrapper/transactions-wrapper";

export function Transactions() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { transactions } = useTransactionsContext();

  console.log("aziuhdjzoaijdaodohd", transactions);
  console.log(transactions?.rewards);

  const items: AccordionItemProps[] = useMemo(() => {
    return (
      transactions?.rewards.map((t, index) => {
        return {
          id: `dashboard-transaction-stats-${index}`,
          titleProps: {
            children: dateKernelPort.format(new Date(t.requestedAt), "MMMM yyyy"),
          },
          badgeProps: {
            children: transactions["totalItemNumber"],
          },
          content: <TransactionsWrapper date={new Date(t.requestedAt)} />,
        };
      }) || []
    );
  }, [dateKernelPort, transactions]);

  return (
    <>
      <Header />

      {!items.length ? (
        <EmptyStateLite
          title={"myDashboard:transactionPanel.transactions.empty.title"}
          message={"myDashboard:transactionPanel.transactions.empty.description"}
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

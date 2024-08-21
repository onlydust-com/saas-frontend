import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";
import { AccordionItemWithBadgeProps } from "@/design-system/molecules/accordion";
import { AccordionWithBadge } from "@/design-system/molecules/accordion/variants/accordion-with-badge";

import { useTransactionsContext } from "../context/transactions.context";
import { Header } from "./components/header/header";
import { TransactionsWrapper } from "./components/transactions-wrapper/transactions-wrapper";

export function Transactions() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { transactionsStats } = useTransactionsContext();

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return (
      transactionsStats?.map((t, index) => {
        return {
          id: `transaction-stats-${index}`,
          titleProps: {
            children: dateKernelPort.format(new Date(t.date), "MMMM yyyy"),
          },
          badgeProps: {
            children: t.transactionCount,
            fitContent: t.transactionCount > 9,
          },
          content: <TransactionsWrapper />,
        };
      }) || []
    );
  }, [dateKernelPort, transactionsStats]);

  return (
    <>
      <Header />

      {!items.length ? (
        <div className="flex flex-col items-center gap-1 py-4">
          <Typo variant="brand" translate={{ token: "programs:transactionPanel.transactions.empty.title" }} />
          <Typo size="s" translate={{ token: "programs:transactionPanel.transactions.empty.description" }} />
        </div>
      ) : (
        <AccordionWithBadge classNames={{ base: "gap-3" }} items={items} />
      )}
    </>
  );
}

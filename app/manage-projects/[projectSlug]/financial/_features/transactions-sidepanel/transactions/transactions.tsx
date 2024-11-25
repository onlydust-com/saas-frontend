import { useMemo } from "react";

import { useTransactionsContext } from "@/app/manage-projects/[projectSlug]/financial/_features/transactions-sidepanel/context/transactions.context";
import { Header } from "@/app/manage-projects/[projectSlug]/financial/_features/transactions-sidepanel/transactions/components/header/header";
import { TransactionsWrapper } from "@/app/manage-projects/[projectSlug]/financial/_features/transactions-sidepanel/transactions/components/transactions-wrapper/transactions-wrapper";

import { bootstrap } from "@/core/bootstrap";

import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";

export function Transactions() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { transactionsStats } = useTransactionsContext();

  const items: AccordionItemProps[] = useMemo(() => {
    return (
      transactionsStats?.map((t, index) => {
        return {
          id: `manage-projects-transaction-stats-${index}`,
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
          title={"manageProjects:transactionPanel.transactions.empty.title"}
          message={"manageProjects:transactionPanel.transactions.empty.description"}
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

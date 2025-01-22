import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { TransactionsEmptyState } from "../transactions-empty-state/transactions-empty-state";
import { TransactionsAccordionProps } from "./transactions-accordion.types";

export function TransactionsAccordion({
  monthlyTransactions,
  ContentComponent,
  isLoading,
}: TransactionsAccordionProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const items: AccordionItemProps[] = useMemo(() => {
    return (
      monthlyTransactions.map(t => {
        return {
          id: `monthly-transaction-${t.date}`,
          titleProps: {
            children: dateKernelPort.format(new Date(t.date), "MMMM yyyy"),
          },
          badgeProps: {
            count: t.count,
          },
          content: <ContentComponent date={new Date(t.date)} />,
        };
      }) || []
    );
  }, [monthlyTransactions, dateKernelPort]);

  if (isLoading) {
    return (
      <div className={"flex w-full flex-col gap-3"}>
        <Skeleton classNames={{ base: "w-full h-24" }} />
        <Skeleton classNames={{ base: "w-full h-24" }} />
        <Skeleton classNames={{ base: "w-full h-24" }} />
      </div>
    );
  }

  if (!items.length) {
    return <TransactionsEmptyState />;
  }

  return (
    <ScrollView>
      <Accordion items={items} defaultSelected={items?.[0] ? [items?.[0].id] : undefined} />
    </ScrollView>
  );
}

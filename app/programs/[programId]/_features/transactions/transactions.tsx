import { useContext, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";
import { AccordionItemWithBadgeProps } from "@/design-system/molecules/accordion";
import { AccordionWithBadge } from "@/design-system/molecules/accordion/variants/accordion-with-badge";

import { Header } from "./components/header/header";
import { TransactionsWrapper } from "./components/transactions-wrapper/transactions-wrapper";
import { TransactionsContext } from "./context/transactions.context";

// TODO: @NeoxAzrot translate all
export function Transactions() {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { programId, transactionStats, queryParams } = useContext(TransactionsContext);

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return (
      transactionStats?.map(t => {
        return {
          id: t.id,
          titleProps: {
            children: dateKernelPort.format(t.date, "MMMM YYYY"),
          },
          badgeProps: {
            children: t.transactionCount,
          },
          content: <TransactionsWrapper queryParams={queryParams} programId={programId} />,
        };
      }) || []
    );
  }, [transactionStats]);

  return (
    <>
      <Header />

      {!items.length ? (
        <div className="flex flex-col items-center gap-1 py-4">
          <Typo variant="brand" translate={{ token: "v2.pages.hackathons.details.issues.filters.empty.title" }} />
          <Typo size="s" translate={{ token: "v2.pages.hackathons.details.issues.filters.empty.description" }} />
        </div>
      ) : (
        <AccordionWithBadge classNames={{ base: "gap-3" }} items={items} />
      )}
    </>
  );
}

import { Avatar } from "components/atoms/avatar";
import { Typo } from "components/atoms/typo";
import { AccordionItemWithBadgeProps } from "components/molecules/accordion";
import { AccordionWithBadge } from "components/molecules/accordion/variants/accordion-with-badge";
import { useContext, useMemo } from "react";

import { IssuesWrapper } from "../../../features/issues-wrapper/issues-wrapper";
import { Header } from "./components/header/header";
import { TransactionsContext } from "./context/transactions.context";

// TODO: @NeoxAzrot translate all
export function Transactions() {
  const { hackathonId, projectIssues, queryParams } = useContext(TransactionsContext);

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return (
      projectIssues?.map(projectIssue => {
        return {
          id: projectIssue.project.id,
          titleProps: {
            children: projectIssue.project.name,
          },
          badgeProps: {
            children: projectIssue.issueCount,
          },
          startContent: <Avatar size="xs" shape="square" src={projectIssue.project.logoUrl} />,
          content: (
            <IssuesWrapper projectId={projectIssue.project.id} queryParams={queryParams} hackathonId={hackathonId} />
          ),
        };
      }) || []
    );
  }, [projectIssues]);

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

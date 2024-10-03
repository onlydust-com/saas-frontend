import { useMemo } from "react";

import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { Translate } from "@/shared/translation/components/translate/translate";

import { IssuesKanbanColumns, IssuesProps } from "./issues.types";

function Column({ type }: { type: IssuesKanbanColumns }) {
  const title = useMemo(() => {
    switch (type) {
      case IssuesKanbanColumns.notAssigned:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.notAssigned"} />;
      case IssuesKanbanColumns.inProgress:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.inProgress"} />;
      case IssuesKanbanColumns.toReview:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.toReview"} />;
      case IssuesKanbanColumns.done:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.done"} />;
      case IssuesKanbanColumns.archive:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.archive"} />;
    }
  }, [type]);

  // TODO : Make request base on type
  // Loop over issues

  return (
    <KanbanColumn
      header={{
        title,
        badge: { children: "12" },
      }}
    />
  );
}

export function Issues(_: IssuesProps) {
  return (
    <div className={"h-full overflow-hidden"}>
      <Kanban>
        <Column type={IssuesKanbanColumns.notAssigned} />
        <Column type={IssuesKanbanColumns.inProgress} />
        <Column type={IssuesKanbanColumns.toReview} />
        <Column type={IssuesKanbanColumns.done} />
        <Column type={IssuesKanbanColumns.archive} />
      </Kanban>
    </div>
  );
}

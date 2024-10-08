import { Columns4, Table } from "lucide-react";
import { useMemo, useState } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { KanbanView } from "./_features/kanban-view/kanban-view";
import { ListView } from "./_features/list-view/list-view";
import { IssuesProps } from "./issues.types";

const LIST = "list";
const KANBAN = "kanban";

export function Issues(_: IssuesProps) {
  const [toggleViews, setToggleViews] = useState<typeof LIST | typeof KANBAN>(KANBAN);

  const renderView = useMemo(() => {
    if (toggleViews === LIST) {
      return <ListView />;
    }

    return <KanbanView />;
  }, [toggleViews]);

  function handleToggleViews(view: string) {
    setToggleViews(view as typeof LIST | typeof KANBAN);
  }

  return (
    <div className="h-full overflow-hidden">
      <Tabs
        onTabClick={handleToggleViews}
        variant="solid"
        tabs={[
          {
            id: LIST,
            children: <Icon component={Table} />,
          },
          {
            id: KANBAN,
            children: <Icon component={Columns4} />,
          },
        ]}
        selectedId={toggleViews}
      />

      {renderView}
    </div>
  );
}

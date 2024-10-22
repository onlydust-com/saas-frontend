import { ReactElement } from "react";

import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";

export interface KanbanProps {
  children: ReactElement<KanbanColumnProps> | ReactElement<KanbanColumnProps>[];
}

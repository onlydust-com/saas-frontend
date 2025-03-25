import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { KanbanProps } from "./kanban.types";

export function Kanban({ children: _children }: KanbanProps) {
  const children = Array.isArray(_children) ? _children : [_children];

  return (
    <div className={"h-full w-full overflow-hidden"}>
      <ScrollView direction={"x"}>
        <div className={`grid h-full min-h-[500px] min-w-[1600px] grid-cols-${children.length} gap-lg`}>
          {children.map(child => child)}
        </div>
      </ScrollView>
    </div>
  );
}

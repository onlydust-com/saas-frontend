import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GithubOrganizationResponse } from "@/core/domain/github/models/github-organization-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { Translate } from "@/shared/translation/components/translate/translate";

import { IssuesKanbanColumns, IssuesProps } from "./issues.types";

function Column({ type, ...kanbanProps }: { type: IssuesKanbanColumns } & Partial<KanbanColumnProps>) {
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
      {...kanbanProps}
      header={{
        title,
        badge: { children: "12" },
        ...(kanbanProps.header || {}),
      }}
    />
  );
}

export function Issues(_: IssuesProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const createMenuItems = (repos: GithubOrganizationResponse["repos"]): MenuItemPort<number>[] => {
    return repos.map(repo => ({
      id: repo.id,
      label: <BaseLink href={`${repo.htmlUrl}/issues/new`}>{repo.name}</BaseLink>,
    }));
  };

  return (
    <div className={"h-full overflow-hidden"}>
      <Kanban>
        <Column
          type={IssuesKanbanColumns.notAssigned}
          header={{
            endContent: (
              <Menu isPopOver={true} closeOnSelect items={createMenuItems(data?.getProjectRepos() || [])}>
                <Button iconOnly variant={"secondary"} size="sm" startIcon={{ component: Plus }} />
              </Menu>
            ),
          }}
        />
        <Column type={IssuesKanbanColumns.inProgress} />
        <Column type={IssuesKanbanColumns.toReview} />
        <Column type={IssuesKanbanColumns.done} />
        <Column type={IssuesKanbanColumns.archive} />
      </Kanban>
    </div>
  );
}

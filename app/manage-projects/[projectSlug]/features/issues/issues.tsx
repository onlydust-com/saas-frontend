import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
} from "@/core/domain/contribution/models/contribution.types";
import { GithubOrganizationResponse } from "@/core/domain/github/models/github-organization-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { Translate } from "@/shared/translation/components/translate/translate";

import { IssuesProps } from "./issues.types";

function Column({ type, ...kanbanProps }: { type: ContributionActivityStatusUnion } & Partial<KanbanColumnProps>) {
  const { data, hasNextPage, fetchNextPage } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      statuses: [type],
    },
  });

  const contributions = data?.pages.flatMap(page => page.contributions) || [];

  const title = useMemo(() => {
    switch (type) {
      case ContributionActivityStatus.NOT_ASSIGNED:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.notAssigned"} />;
      case ContributionActivityStatus.IN_PROGRESS:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.inProgress"} />;
      case ContributionActivityStatus.TO_REVIEW:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.toReview"} />;
      case ContributionActivityStatus.DONE:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.done"} />;
      case ContributionActivityStatus.ARCHIVED:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.archive"} />;
    }
  }, [type]);

  return (
    <KanbanColumn
      {...kanbanProps}
      hasNextPage={hasNextPage}
      onNext={fetchNextPage}
      header={{
        title,
        badge: { children: data?.pages?.[0]?.totalItemNumber ?? "0" },
        ...(kanbanProps.header || {}),
      }}
    >
      {contributions?.map(contribution => (
        <div className={"bg-background-primary p-3"} key={contribution.id}>
          <ContributionBadge
            type={contribution.type}
            githubStatus={contribution.githubStatus}
            number={contribution.githubNumber}
          />
          {contribution.githubTitle}
        </div>
      ))}
    </KanbanColumn>
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
          type={ContributionActivityStatus.NOT_ASSIGNED}
          header={{
            endContent: (
              <Menu isPopOver={true} closeOnSelect items={createMenuItems(data?.getProjectRepos() || [])}>
                <Button iconOnly variant={"secondary"} size="sm" startIcon={{ component: Plus }} />
              </Menu>
            ),
          }}
        />
        <Column type={ContributionActivityStatus.IN_PROGRESS} />
        <Column type={ContributionActivityStatus.TO_REVIEW} />
        <Column type={ContributionActivityStatus.DONE} />
        <Column type={ContributionActivityStatus.ARCHIVED} />
      </Kanban>
    </div>
  );
}

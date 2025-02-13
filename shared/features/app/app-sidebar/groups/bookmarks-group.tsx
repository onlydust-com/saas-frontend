import Link from "next/link";
import { useMemo } from "react";

import { BookmarkReactQueryAdapter } from "@/core/application/react-query-adapter/bookmark";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton } from "@/shared/ui/sidebar";

export function BookmarksGroup() {
  const { capture } = usePosthog();

  const { data } = BookmarkReactQueryAdapter.client.useGetBookmarks({});
  const { data: projects } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: {
      projectIds: data?.bookmarks ?? [],
    },
    options: {
      enabled: !!data?.bookmarks?.length,
    },
  });

  const projectsList = useMemo(() => projects?.pages.flatMap(({ projects }) => projects) ?? [], [projects]);

  const items = projectsList.map(project => ({
    title: project.name,
    url: NEXT_ROUTER.projects.details.root(project.slug),
    onClick: () => capture("project_bookmark_clicked", { projectId: project.id }),
    icon: (
      <Avatar className="h-4 w-4 rounded-sm">
        <AvatarImage src={project.logoUrl} />
        <AvatarFallback className="h-4 w-4 rounded-sm text-xs">{project.name[0]}</AvatarFallback>
      </Avatar>
    ),
  }));

  if (!projectsList.length || !data?.bookmarks?.length) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Bookmarks
        <Badge variant="secondary" className="ml-auto">
          <span>Beta</span>
        </Badge>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Link href={item.url} onClick={item.onClick}>
            <SidebarMenuButton tooltip={item.title} key={item.title} className="group/sidebar-menu-button">
              {item.icon}
              <span className="line-clamp-1" title={item.title}>
                {item.title}
              </span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

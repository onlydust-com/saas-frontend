import Link from "next/link";
import { useMemo } from "react";

import { BookmarkReactQueryAdapter } from "@/core/application/react-query-adapter/bookmark";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton } from "@/shared/ui/sidebar";

export function BookmarksGroup() {
  const { capture } = usePosthog();

  const { data } = BookmarkReactQueryAdapter.client.useGetBookmarks({});

  const projectsList = useMemo(() => data?.projects ?? [], [data]);

  const items = projectsList.map(project => ({
    title: project.name,
    id: project.id,
    url: NEXT_ROUTER.projects.details.root(project.slug),
    onClick: () => capture("project_bookmark_clicked", { projectId: project.id }),
    icon: (
      <Avatar className="h-4 w-4 rounded-sm">
        <AvatarImage src={project.logoUrl} />
        <AvatarFallback className="h-4 w-4 rounded-sm text-xs">{project.name[0]}</AvatarFallback>
      </Avatar>
    ),
  }));

  if (!projectsList.length) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Link href={item.url} onClick={item.onClick} key={item.id}>
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

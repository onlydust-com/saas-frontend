import { ChevronRight, SquarePlus } from "lucide-react";
import Link from "next/link";
import { useFeatureFlagEnabled } from "posthog-js/react";
import { useMemo } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { IssueCreationPanel } from "@/shared/panels/issue-creation-panel/issue-creation-panel";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/ui/sidebar";

const MAX_PROJECTS = 3;

function SubItem({ title, url }: { title: string; url: string }) {
  const isRoute = useMatchPath(url, { exact: false });

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={isRoute}>
        <Link href={url}>
          <span>{title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export function MaintainerGroup() {
  const { state } = useSidebar();
  const { user } = useAuthUser();
  const isMaintainerRoute = useMatchPath(NEXT_ROUTER.manageProjects.root, { exact: false });
  const isProjectCreateRoute = useMatchPath(NEXT_ROUTER.createProject.root, { exact: false });

  const projects = useMemo(() => user?.projectsLed ?? [], [user]);
  const visibleProjects = useMemo(() => projects.slice(0, MAX_PROJECTS), [projects]);
  const canSeeAll = useMemo(() => projects.length > MAX_PROJECTS, [projects.length]);
  const isBetaEnabled = useFeatureFlagEnabled("issue-creator");
  const items = visibleProjects.map(project => ({
    title: project.name,
    icon: (
      <Avatar className="h-4 w-4 rounded-sm">
        <AvatarImage src={project.logoUrl} />
        <AvatarFallback className="h-4 w-4 rounded-sm text-xs">{project.name[0]}</AvatarFallback>
      </Avatar>
    ),
    isActive: isMaintainerRoute,
    items: [
      {
        title: "Contributions",
        url: NEXT_ROUTER.manageProjects.contributions.root(project.slug),
      },
      {
        title: "Contributors",
        url: NEXT_ROUTER.manageProjects.contributors.root(project.slug),
      },
      {
        title: "Financial",
        url: NEXT_ROUTER.manageProjects.financial.root(project.slug),
      },
      {
        title: "Create issue",
        element: isBetaEnabled ? (
          <IssueCreationPanel projectId={project.id ?? ""}>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <div className="w-full cursor-pointer items-center justify-between gap-1">
                  <span>Create issue</span>
                  <Badge variant="emphasis" className="ml-auto">
                    New
                  </Badge>
                </div>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </IssueCreationPanel>
        ) : null,
      },
    ],
  }));

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Maintainer</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={isProjectCreateRoute} asChild tooltip="Submit a project">
            <Link href={NEXT_ROUTER.createProject.root}>
              <SquarePlus />
              <span>Submit a project</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {items.map(item => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span className="line-clamp-1" title={item.title}>
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem =>
                    subItem.url ? (
                      <SubItem key={subItem.title} title={subItem.title} url={subItem.url} />
                    ) : (
                      subItem.element
                    )
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        {canSeeAll && state !== "collapsed" ? (
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="See all" className="text-muted-foreground">
              <Link href={NEXT_ROUTER.manageProjects.root}>See all</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null}
      </SidebarMenu>
    </SidebarGroup>
  );
}

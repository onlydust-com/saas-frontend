import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
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

const MAX_PROGRAMS = 3;

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

export function ProgramGroup() {
  const { state } = useSidebar();
  const { user } = useAuthUser();
  const isProgramRoute = useMatchPath(NEXT_ROUTER.programs.root, { exact: false });

  const programs = useMemo(() => user?.programs?.slice(0, MAX_PROGRAMS) ?? [], [user]);
  const canSeeAll = useMemo(() => programs.length > MAX_PROGRAMS, [programs]);

  const items = programs.map(program => ({
    title: program.name,
    icon: (
      <Avatar className="h-4 w-4 rounded-sm">
        <AvatarImage src={program.logoUrl} />
        <AvatarFallback className="h-4 w-4 rounded-sm text-xs">{program.name[0]}</AvatarFallback>
      </Avatar>
    ),
    isActive: isProgramRoute,
    items: [
      {
        title: "Overview",
        url: NEXT_ROUTER.programs.projects.root(program.id),
      },
      {
        title: "Financial",
        url: NEXT_ROUTER.programs.financial.root(program.id),
      },
    ],
  }));

  if (!programs.length) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Programs</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => <SubItem key={subItem.title} title={subItem.title} url={subItem.url} />)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        {canSeeAll && state !== "collapsed" ? (
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="See all" className="text-muted-foreground">
              <Link href={NEXT_ROUTER.programs.root}>See all</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null}
      </SidebarMenu>
    </SidebarGroup>
  );
}

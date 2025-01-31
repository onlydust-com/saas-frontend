import { ChevronRight, Database } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
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
} from "@/shared/ui/sidebar";

export function DataGroup() {
  const isDataRoute = useMatchPath(NEXT_ROUTER.data.root, { exact: false });
  const isOverviewRoute = useMatchPath(NEXT_ROUTER.data.overview.root, { exact: false });
  const isContributorsRoute = useMatchPath(NEXT_ROUTER.data.contributors.root, { exact: false });
  const isProjectsRoute = useMatchPath(NEXT_ROUTER.data.projects.root, { exact: false });

  const items = [
    {
      title: "Data",
      url: NEXT_ROUTER.data.root,
      icon: Database,
      isActive: isDataRoute,
      items: [
        {
          title: "Overview",
          url: NEXT_ROUTER.data.overview.root,
          isActive: isOverviewRoute,
        },
        {
          title: "Contributors",
          url: NEXT_ROUTER.data.contributors.root,
          isActive: isContributorsRoute,
        },
        {
          title: "Projects",
          url: NEXT_ROUTER.data.projects.root,
          isActive: isProjectsRoute,
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Data</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

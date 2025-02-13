import { Bot, Compass, FolderSearch, Orbit, Rocket } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Badge } from "@/shared/ui/badge";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

export function ExploreGroup() {
  const isDiscoverRoute = useMatchPath(NEXT_ROUTER.discover.root, { exact: false });
  const isBrowseRoute = useMatchPath(NEXT_ROUTER.projects.root, { exact: false });
  const isOswRoute = useMatchPath(NEXT_ROUTER.osw.root, { exact: false });
  const isEcosystemsRoute = useMatchPath(NEXT_ROUTER.ecosystems.root, { exact: false });
  const isOdSayRoute = useMatchPath(NEXT_ROUTER.odSay.root, { exact: false });

  const items = [
    {
      title: "Discover",
      url: NEXT_ROUTER.discover.root,
      icon: Compass,
      isActive: isDiscoverRoute,
    },
    {
      title: "Browse",
      url: NEXT_ROUTER.projects.root,
      icon: FolderSearch,
      isActive: isBrowseRoute,
    },
    {
      title: "Open-Source Week",
      url: NEXT_ROUTER.osw.root,
      icon: Rocket,
      isActive: isOswRoute,
    },
    {
      title: "Ecosystems",
      url: NEXT_ROUTER.ecosystems.root,
      icon: Orbit,
      isActive: isEcosystemsRoute,
    },
    {
      title: "OD-Say",
      url: NEXT_ROUTER.odSay.root,
      icon: Bot,
      isActive: isOdSayRoute,
      isNew: true,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                  {item.isNew && (
                    <Badge variant="emphasis" className="ml-auto">
                      <span>New</span>
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

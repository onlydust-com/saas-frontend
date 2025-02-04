import { Compass, Folder, FolderSearch, Orbit, Rocket } from "lucide-react";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
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
  const isHackathonsRoute = useMatchPath(NEXT_ROUTER.hackathons.root, { exact: false });
  const isEcosystemsRoute = useMatchPath(NEXT_ROUTER.ecosystems.root, { exact: false });
  const isCategoriesRoute = useMatchPath(NEXT_ROUTER.categories.root, { exact: false });

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
      title: "Hackathons",
      url: NEXT_ROUTER.hackathons.root,
      icon: Rocket,
      isActive: isHackathonsRoute,
    },
    {
      title: "Ecosystems",
      url: NEXT_ROUTER.ecosystems.root,
      icon: Orbit,
      isActive: isEcosystemsRoute,
    },
    {
      title: "Categories",
      url: NEXT_ROUTER.categories.root,
      icon: Folder,
      isActive: isCategoriesRoute,
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
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

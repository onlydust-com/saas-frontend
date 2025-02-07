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

const MAX_SPONSORS = 3;

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

export function SponsorGroup() {
  const { state } = useSidebar();
  const { user } = useAuthUser();
  const isSponsorRoute = useMatchPath(NEXT_ROUTER.financials.root, { exact: false });

  const sponsors = useMemo(() => user?.sponsors ?? [], [user]);
  const visibleSponsors = useMemo(() => sponsors.slice(0, MAX_SPONSORS), [sponsors]);
  const canSeeAll = useMemo(() => sponsors.length > MAX_SPONSORS, [sponsors.length]);

  const items = visibleSponsors.map(sponsor => ({
    title: sponsor.name,
    icon: (
      <Avatar className="h-4 w-4 rounded-sm">
        <AvatarImage src={sponsor.logoUrl} />
        <AvatarFallback className="h-4 w-4 rounded-sm text-xs">{sponsor.name[0]}</AvatarFallback>
      </Avatar>
    ),
    isActive: isSponsorRoute,
    items: [
      {
        title: "Programs",
        url: NEXT_ROUTER.financials.programs.root(sponsor.id),
      },
      {
        title: "Financial",
        url: NEXT_ROUTER.financials.financial.root(sponsor.id),
      },
    ],
  }));

  if (!sponsors.length) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sponsors</SidebarGroupLabel>
      <SidebarMenu>
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
                  {item.items?.map(subItem => <SubItem key={subItem.title} title={subItem.title} url={subItem.url} />)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        {canSeeAll && state !== "collapsed" ? (
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="See all" className="text-muted-foreground">
              <Link href={NEXT_ROUTER.financials.root}>See all</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null}
      </SidebarMenu>
    </SidebarGroup>
  );
}

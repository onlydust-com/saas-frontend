import logoWordmark from "@/public/images/logos/logo-color.svg";
import logo from "@/public/images/logos/logo-white.svg";
import Image from "next/image";

import { ContributorGroup } from "@/shared/features/app-sidebar/groups/contributor-group";
import { DataGroup } from "@/shared/features/app-sidebar/groups/data-group";
import { ExploreGroup } from "@/shared/features/app-sidebar/groups/explore-group";
import { MaintainerGroup } from "@/shared/features/app-sidebar/groups/maintainer-group";
import { ProgramGroup } from "@/shared/features/app-sidebar/groups/program-group";
import { SponsorGroup } from "@/shared/features/app-sidebar/groups/sponsor-group";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/shared/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="p-2">
          {isCollapsed ? (
            <Image src={logo} alt={"OnlyDust"} width={24} height={24} />
          ) : (
            <Image src={logoWordmark} alt={"OnlyDust"} width={98} height={24} />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ExploreGroup />

        <ContributorGroup />

        <DataGroup />

        <MaintainerGroup />

        <ProgramGroup />

        <SponsorGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

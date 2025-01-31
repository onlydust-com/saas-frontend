import { ContributorGroup } from "@/shared/features/app-sidebar/groups/contributor-group";
import { DataGroup } from "@/shared/features/app-sidebar/groups/data-group";
import { ExploreGroup } from "@/shared/features/app-sidebar/groups/explore-group";
import { MaintainerGroup } from "@/shared/features/app-sidebar/groups/maintainer-group";
import { ProgramGroup } from "@/shared/features/app-sidebar/groups/program-group";
import { SponsorGroup } from "@/shared/features/app-sidebar/groups/sponsor-group";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/shared/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>hello</SidebarHeader>
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

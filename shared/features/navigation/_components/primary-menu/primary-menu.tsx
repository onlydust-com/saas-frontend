import { ChartLine, Clipboard, Compass, FolderKanban, Gauge, Wallet } from "lucide-react";

import { ItemNav } from "@/design-system/molecules/item-nav";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { useShowEcosystemList } from "@/shared/hooks/ecosystems/use-show-ecosystem-list";
import { useShowProgramsList } from "@/shared/hooks/programs/use-show-programs-list";
import { useShowProjectsList } from "@/shared/hooks/projects/use-show-projects-list";
import { useShowSponsorList } from "@/shared/hooks/sponsors/use-show-sponsor-list";

export function PrimaryMenu() {
  const [showSponsorList] = useShowSponsorList();
  const [showProgramList] = useShowProgramsList();
  const [showEcosystemList] = useShowEcosystemList();
  const [showProjectList] = useShowProjectsList();

  // Has a program or an ecosystem in /me
  const pageDataAvailable = showProgramList.hasPrograms || showEcosystemList.hasEcosystems;

  return (
    <>
      <ItemNav
        iconProps={{ component: ChartLine }}
        linkProps={
          pageDataAvailable
            ? {
                href: NEXT_ROUTER.data.root,
                matchPathOptions: {
                  exact: false,
                  pattern: NEXT_ROUTER.data.root,
                },
              }
            : undefined
        }
        translate={{ token: "primaryNavigation:primaryMenu.data" }}
        isDisabled={!pageDataAvailable}
      />
      <ItemNav
        iconProps={{ component: Wallet }}
        linkProps={{
          href: showSponsorList.hasMultipleSponsors
            ? NEXT_ROUTER.financials.root
            : NEXT_ROUTER.financials.programs.root(showSponsorList.firstSponsor ?? ""),
          matchPathOptions: {
            exact: false,
            pattern: NEXT_ROUTER.financials.root,
          },
        }}
        translate={{ token: "primaryNavigation:primaryMenu.financial" }}
        isDisabled={showSponsorList.loading || !showSponsorList.hasSponsors}
      />
      <ItemNav
        iconProps={{ component: Clipboard }}
        linkProps={{
          href: showProgramList.hasMultiplePrograms
            ? NEXT_ROUTER.programs.root
            : NEXT_ROUTER.programs.projects.root(showProgramList.firstProgram ?? ""),
          matchPathOptions: {
            exact: false,
            pattern: NEXT_ROUTER.programs.root,
          },
        }}
        translate={{ token: "primaryNavigation:primaryMenu.program" }}
        isDisabled={showProgramList.loading || !showProgramList.hasPrograms}
      />
      <ItemNav
        iconProps={{ component: FolderKanban }}
        linkProps={{
          href: showProjectList.hasMultipleProjects
            ? NEXT_ROUTER.manageProjects.root
            : NEXT_ROUTER.manageProjects.default.root(showProjectList.firstProject ?? ""),
          matchPathOptions: {
            exact: false,
            pattern: NEXT_ROUTER.manageProjects.root,
          },
        }}
        translate={{ token: "primaryNavigation:primaryMenu.manageProject" }}
      />
      <ItemNav
        iconProps={{ component: Gauge }}
        linkProps={{
          href: NEXT_ROUTER.myDashboard.root,
          matchPathOptions: {
            exact: false,
            pattern: NEXT_ROUTER.myDashboard.root,
          },
        }}
        translate={{ token: "primaryNavigation:primaryMenu.myDashboard" }}
      />
      <ItemNav
        iconProps={{ component: Compass }}
        linkProps={{ href: marketplaceRouting("/projects") }}
        translate={{ token: "primaryNavigation:primaryMenu.projects" }}
      />
    </>
  );
}

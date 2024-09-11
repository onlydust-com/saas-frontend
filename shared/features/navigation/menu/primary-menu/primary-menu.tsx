import { ChartLine, Clipboard, Compass, Wallet } from "lucide-react";

import { ItemNav } from "@/design-system/molecules/item-nav";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useShowProgramsList } from "@/shared/hooks/programs/use-show-programs-list";
import { useShowSponsorList } from "@/shared/hooks/sponsors/use-show-sponsor-list";

import { PrimaryMenuProps } from "./primary-menu.types";

export function PrimaryMenu({ isFolded }: PrimaryMenuProps) {
  const [showSponsorList] = useShowSponsorList();
  const [showProgramList] = useShowProgramsList();
  return (
    <>
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: ChartLine }}
        translate={{ token: "primaryNavigation:primaryMenu.data" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: Wallet }}
        translate={{ token: "primaryNavigation:primaryMenu.financial" }}
        isDisabled={showSponsorList.loading || !showSponsorList.hasSponsor}
        linkProps={{
          href: showSponsorList.hasMultipleSponsors
            ? NEXT_ROUTER.financials.root
            : NEXT_ROUTER.financials.details.root(showSponsorList.firstSponsor ?? ""),
        }}
      />
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: Clipboard }}
        linkProps={{
          href: showProgramList.hasMultiplePrograms
            ? NEXT_ROUTER.programs.root
            : NEXT_ROUTER.programs.details.root(showProgramList.firstProgram ?? ""),
        }}
        translate={{ token: "primaryNavigation:primaryMenu.program" }}
        isDisabled={showProgramList.loading || !showProgramList.hasPrograms}
      />
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: Compass }}
        linkProps={{ href: `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/projects` ?? "" }}
        translate={{ token: "primaryNavigation:primaryMenu.projects" }}
      />
    </>
  );
}

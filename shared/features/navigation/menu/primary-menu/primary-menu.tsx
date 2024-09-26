import { ChartLine, CircleDashed, Clipboard, Compass, Wallet } from "lucide-react";

import { ItemNav } from "@/design-system/molecules/item-nav";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
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
        isComingSoon={true}
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
        linkProps={{ href: marketplaceRouting("/projects") }}
        translate={{ token: "primaryNavigation:primaryMenu.projects" }}
      />
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: CircleDashed }}
        translate={{ token: "primaryNavigation:primaryMenu.maintainer" }}
        isComingSoon={true}
      />
    </>
  );
}

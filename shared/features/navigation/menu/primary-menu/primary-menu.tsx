import { ChartLine, Clipboard, Compass, Wallet } from "lucide-react";

import { ItemNav } from "@/design-system/molecules/item-nav";

import { NEXT_ROUTER } from "@/shared/constants/router";

import { PrimaryMenuProps } from "./primary-menu.types";

export function PrimaryMenu({ isFolded }: PrimaryMenuProps) {
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
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        iconProps={{ component: Clipboard }}
        linkProps={{ href: NEXT_ROUTER.programs.root }}
        translate={{ token: "primaryNavigation:primaryMenu.program" }}
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

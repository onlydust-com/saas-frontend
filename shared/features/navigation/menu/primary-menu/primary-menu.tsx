import { ItemNav } from "@/design-system/molecules/item-nav";

import { NEXT_ROUTER } from "@/shared/constants/router";

import { PrimaryMenuProps } from "./primary-menu.types";

export function PrimaryMenu({ isFolded }: PrimaryMenuProps) {
  return (
    <>
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-line-chart-line" }}
        translate={{ token: "primaryNavigation:primaryMenu.data" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-wallet-3-line" }}
        translate={{ token: "primaryNavigation:primaryMenu.financial" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-clipboard-line" }}
        linkProps={{ href: NEXT_ROUTER.programs.root }}
        translate={{ token: "primaryNavigation:primaryMenu.program" }}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-compass-3-line" }}
        linkProps={{ href: `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/projects` ?? "" }}
        translate={{ token: "primaryNavigation:primaryMenu.projects" }}
      />
    </>
  );
}

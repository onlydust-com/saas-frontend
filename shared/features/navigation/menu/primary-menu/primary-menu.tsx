import { ItemNav } from "@/design-system/molecules/item-nav";

import { PrimaryMenuProps } from "./primary-menu.types";

export function PrimaryMenu({ isFolded }: PrimaryMenuProps) {
  return (
    <>
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-line-chart-line" }}
        linkProps={{ href: "/test" }}
        translate={{ token: "primaryNavigation:primaryMenu.data" }}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-wallet-3-line" }}
        linkProps={{ href: "/test" }}
        translate={{ token: "primaryNavigation:primaryMenu.financial" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-clipboard-line" }}
        linkProps={{ href: "/test" }}
        translate={{ token: "primaryNavigation:primaryMenu.program" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-compass-3-line" }}
        linkProps={{ href: process.env.NEXT_PUBLIC_MARKETPLACE_URL ?? "" }}
        translate={{ token: "primaryNavigation:primaryMenu.projects" }}
      />
    </>
  );
}

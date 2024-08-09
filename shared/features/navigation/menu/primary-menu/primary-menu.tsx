import { PrimaryMenuProps } from "shared/features/navigation/menu/primary-menu/primary-menu.types";

import { ItemNav } from "@/design-system/molecules/item-nav";

export function PrimaryMenu({ isFolded }: PrimaryMenuProps) {
  return (
    <>
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-line-chart-line" }}
        href={"/test"}
        translate={{ token: "primaryNavigation:primaryMenu.data" }}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-wallet-3-line" }}
        href={"/test2"}
        translate={{ token: "primaryNavigation:primaryMenu.financial" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-clipboard-line" }}
        href={"/test2"}
        translate={{ token: "primaryNavigation:primaryMenu.program" }}
        isDisabled={true}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-compass-3-line" }}
        href={"/test2"}
        translate={{ token: "primaryNavigation:primaryMenu.projects" }}
      />
    </>
  );
}

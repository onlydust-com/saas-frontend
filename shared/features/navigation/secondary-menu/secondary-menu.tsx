import { ItemNav } from "@/design-system/molecules/item-nav";

import { SecondaryMenuProps } from "./secondary-menu.types";

export function SecondaryMenu({ isFolded }: SecondaryMenuProps) {
  return (
    <>
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-settings-line" }}
        href={"/test"}
        translate={{ token: "primaryNavigation:secondaryMenu.support" }}
      />
      <ItemNav
        isFolded={isFolded}
        icon={{ name: "ri-chat-4-line" }}
        href={"/test2"}
        translate={{ token: "primaryNavigation:secondaryMenu.settings" }}
        isDisabled={true}
      />
    </>
  );
}

import { PanelLeftClose, PanelRightClose } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { cn } from "@/shared/helpers/cn";

import { HeaderMenuProps } from "./header-menu.types";

export function HeaderMenu({ isFolded, onFoldChange }: HeaderMenuProps) {
  function onUnFold() {
    onFoldChange?.(false);
  }

  function onFold() {
    onFoldChange?.(true);
  }

  return (
    <div className={"relative flex w-full items-center justify-between gap-1 overflow-hidden"}>
      <div className={"group/header w-fit"}>
        <BaseLink href={NEXT_ROUTER.home.root}>
          <Logo
            classNames={{
              base: cn({ "group-hover/header:!opacity-0 transition-all": isFolded }),
            }}
          />
        </BaseLink>
        {isFolded && (
          <Button
            variant={"secondary-light"}
            startIcon={PanelRightClose}
            hideText={true}
            size={"l"}
            onClick={onUnFold}
            classNames={{
              base: "absolute top-0 left-0 transition-all opacity-0 group-hover/header:opacity-100 !border-container-stroke-separator",
            }}
          />
        )}
      </div>
      <Button variant={"secondary-light"} startIcon={PanelLeftClose} hideText={true} size={"l"} onClick={onFold} />
    </div>
  );
}

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

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
      <div className={cn("group/header")}>
        <BaseLink href={NEXT_ROUTER.home.root}>
          <Logo
            classNames={{
              base: cn("h-6 justify-center gap-md px-lg transition-all w-fit", {
                "!gap-0 !px-2  group-hover/header:opacity-0": isFolded,
              }),
              illustration: cn("min-w-6 h-6 w-auto"),
              wordmark: cn("min-w-0 h-4 w-auto transition-all", { hidden: isFolded }),
            }}
          />
        </BaseLink>

        {isFolded && (
          <Button
            variant={"tertiary"}
            startIcon={{ component: PanelLeftOpen }}
            iconOnly={true}
            size={"xs"}
            onClick={onUnFold}
            classNames={{
              base: "opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover/header:opacity-100 justify-center items-center",
            }}
          />
        )}
      </div>
      <div className={"flex flex-1 items-center justify-end"}>
        <Button
          variant={"tertiary"}
          startIcon={{ component: PanelLeftClose }}
          iconOnly={true}
          size={"xs"}
          onClick={onFold}
        />
      </div>
    </div>
  );
}

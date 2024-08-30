import { LogIn, PanelLeftClose } from "lucide-react";

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
    <div className={"relative flex w-full items-center justify-between gap-1 overflow-hidden px-lg py-md"}>
      <div className={cn("group/header w-fit", { "flex w-full items-center justify-center": isFolded })}>
        <BaseLink href={NEXT_ROUTER.home.root}>
          <Logo
            classNames={{
              base: cn("h-6 w-auto justify-start gap-md", { "group-hover/header:!opacity-0 transition-all": isFolded }),
              illustration: cn("min-w-6 h-6 w-auto"),
              wordmark: cn("min-w-auto h-6 w-auto"),
            }}
            type={isFolded ? "illustration" : undefined}
          />
        </BaseLink>
        {isFolded && (
          <Button
            variant={"tertiary"}
            startIcon={{ component: LogIn }}
            iconOnly={true}
            size={"xs"}
            onClick={onUnFold}
            classNames={{
              base: "opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover/header:opacity-100 w-10 h-10 justify-center items-center",
            }}
          />
        )}
      </div>
      {!isFolded && (
        <Button
          variant={"tertiary"}
          startIcon={{ component: PanelLeftClose }}
          iconOnly={true}
          size={"xs"}
          onClick={onFold}
        />
      )}
    </div>
  );
}

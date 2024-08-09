import { Button } from "@/design-system/atoms/button/variants/button-default";

import { Logo } from "@/shared/components/logo/logo";
import { cn } from "@/shared/helpers/cn";

import { HeaderMenuProps } from "./header-menu.types";

export function HeaderMenu({ isFolded, onFoldChange }: HeaderMenuProps) {
  function onUnFold() {
    onFoldChange(false);
  }

  function onFold() {
    onFoldChange(true);
  }

  return (
    <div className={"relative flex w-full items-center justify-between gap-1 overflow-hidden"}>
      <div className={"group/header w-fit"}>
        <Logo
          classNames={{
            base: cn({ "group-hover/header:!opacity-0 transition-all": isFolded }),
          }}
        />
        {isFolded && (
          <Button
            variant={"secondary-light"}
            startIcon={{ name: "ri-sidebar-unfold-line" }}
            hideText={true}
            size={"l"}
            onClick={onUnFold}
            classNames={{
              base: "absolute top-0 left-0 transition-all opacity-0 group-hover/header:opacity-100 !border-container-stroke-separator",
            }}
          />
        )}
      </div>
      <Button
        variant={"secondary-light"}
        startIcon={{ name: "ri-sidebar-fold-line" }}
        hideText={true}
        size={"l"}
        onClick={onFold}
      />
    </div>
  );
}

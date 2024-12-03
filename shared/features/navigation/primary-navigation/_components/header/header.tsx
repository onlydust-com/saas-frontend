import { ChevronsLeft, Menu } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { UserMenu } from "@/shared/features/navigation/menu/user-menu/user-menu";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";

import { HeaderProps } from "./header.types";

export function Header({ onToggle, isOpen }: HeaderProps) {
  return (
    <header className={"flex w-full justify-between gap-xs border-b-1 border-border-primary px-2xl py-xl"}>
      <Button
        variant={"tertiary"}
        iconOnly={true}
        size={"sm"}
        startIcon={{ component: isOpen ? ChevronsLeft : Menu }}
        onClick={onToggle}
      />
      <BaseLink href={NEXT_ROUTER.home.root} className={"flex flex-row items-center justify-center"}>
        <Logo />
      </BaseLink>
      <div className={"flex flex-row items-center justify-end gap-6"}>
        <NotificationsPopover />
        <UserMenu isCompact={true} />
      </div>
    </header>
  );
}

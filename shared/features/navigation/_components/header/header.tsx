import { ChevronsLeft, Menu } from "lucide-react";

import { Breadcrumbs } from "@/design-system/atoms/breadcrumbs";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { UserMenu } from "@/shared/features/navigation/_components/user-menu/user-menu";
import { NotificationsModal } from "@/shared/features/notifications/notifications-modal";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";
import { IsAuthenticated, SignInButton } from "@/shared/providers/auth-provider";

import { useNavigation } from "../../navigation.context";
import { HeaderProps } from "./header.types";

export function Header({ onToggle, isOpen }: HeaderProps) {
  const { breadcrumb } = useNavigation();
  const isTablet = useIsTablet("lower");

  return (
    <header className={"w-full border-b-1 border-border-primary px-2xl py-xl"}>
      <div className="mx-auto flex w-full max-w-[2600px] justify-between gap-xs">
        <div className="flex flex-1 flex-row items-center justify-start">
          <Button
            variant={"tertiary"}
            iconOnly={true}
            size={"sm"}
            startIcon={{ component: isOpen ? ChevronsLeft : Menu }}
            onClick={onToggle}
          />
          {!isTablet && breadcrumb ? <Breadcrumbs items={breadcrumb} /> : null}
        </div>

        <div className="flex flex-1 flex-row items-center justify-center">
          <BaseLink href={NEXT_ROUTER.home.root} className={"flex flex-row items-center justify-center"}>
            <Logo />
          </BaseLink>
        </div>

        <div className={"flex flex-1 flex-row items-center justify-end gap-6"}>
          <IsAuthenticated>
            <IsAuthenticated.Yes>
              <GlobalSearch isMobile={isTablet} />
              {isTablet ? <NotificationsModal /> : <NotificationsPopover />}
              <UserMenu isCompact={true} />
            </IsAuthenticated.Yes>
            <IsAuthenticated.No>
              <SignInButton />
            </IsAuthenticated.No>
          </IsAuthenticated>
        </div>
      </div>
    </header>
  );
}

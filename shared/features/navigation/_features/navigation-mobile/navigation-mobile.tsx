import { Menu, X } from "lucide-react";
import { PropsWithChildren, useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Modal } from "@/design-system/molecules/modal";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { PrimaryMenu } from "@/shared/features/navigation/_components/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/_components/secondary-menu/secondary-menu";
import { UserMenu } from "@/shared/features/navigation/_components/user-menu/user-menu";
import { NotificationsModal } from "@/shared/features/notifications/notifications-modal";

export function NavigationMobile({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={"flex items-center justify-between gap-2 pt-xs"}>
        <BaseLink href={NEXT_ROUTER.home.root}>
          <Logo />
        </BaseLink>

        <div className={"flex flex-row gap-3"}>
          <GlobalSearch isMobile={true} />
          <NotificationsModal />
          <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Menu }} iconOnly onClick={handleOpen} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
        hideHeader={true}
        placement={"bottom"}
        size="8xl"
        classNames={{ modal: "rounded-b-none !m-0" }}
      >
        <div className={"flex w-full flex-col gap-3"}>
          <div className={"flex w-full flex-row items-center gap-1"}>
            <UserMenu />
            <Button variant={"tertiary"} size={"sm"} startIcon={{ component: X }} iconOnly onClick={handleClose} />
          </div>

          <PrimaryMenu />
          <SecondaryMenu />
        </div>
      </Modal>
      {children}
    </>
  );
}

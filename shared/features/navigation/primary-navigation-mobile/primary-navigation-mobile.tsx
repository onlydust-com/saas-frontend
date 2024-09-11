import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Modal } from "@/design-system/molecules/modal";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PrimaryMenu } from "@/shared/features/navigation/menu/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/menu/secondary-menu/secondary-menu";
import { UserMenu } from "@/shared/features/navigation/menu/user-menu/user-menu";
import { Notifications } from "@/shared/features/notifications/notifications";

export function PrimaryNavigationMobile() {
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
          <Popover placement={"bottom-end"}>
            <Popover.Trigger>
              {() => (
                <div>
                  <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Bell }} iconOnly />
                </div>
              )}
            </Popover.Trigger>
            <Popover.Content unstyled className={"max-w-dvw"}>
              {({ setIsOpen }) => <Notifications onClose={() => setIsOpen(false)} />}
            </Popover.Content>
          </Popover>

          <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Menu }} iconOnly onClick={handleOpen} />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
        hideHeader={true}
        placement={"bottom"}
        classNames={{ modal: "min-w-full max-w-full rounded-b-none !my-0" }}
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
    </>
  );
}

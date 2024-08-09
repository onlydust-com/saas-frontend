import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Modal } from "@/design-system/molecules/modal";

import { Logo } from "@/shared/components/logo/logo";
import { PrimaryMenu } from "@/shared/features/navigation/menu/primary-menu/primary-menu";
import { SecondaryMenu } from "@/shared/features/navigation/menu/secondary-menu/secondary-menu";
import { UserMenu } from "@/shared/features/navigation/menu/user-menu/user-menu";

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
      <Paper
        as={"header"}
        size={"s"}
        container={"2"}
        border={"none"}
        classNames={{ base: "flex justify-between items-center gap-2" }}
      >
        <div className={"flex items-center gap-2"}>
          <Logo />
        </div>

        <div className={"flex flex-row gap-3"}>
          <Button variant={"secondary-light"} size={"l"} startIcon={{ name: "ri-notification-3-line" }} hideText />
          <Button
            variant={"secondary-light"}
            size={"l"}
            startIcon={{ name: "ri-menu-fill" }}
            hideText
            onClick={handleOpen}
          />
        </div>
      </Paper>
      <Modal
        isOpen={isOpen}
        onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
        hideHeader={true}
        placement={"bottom"}
        classNames={{ modal: "min-w-full max-w-full rounded-b-none !my-0" }}
      >
        <div className={"flex w-full flex-col gap-3"}>
          <div className={"flex w-full flex-row gap-1"}>
            <UserMenu />
            <Button
              variant={"secondary-light"}
              size={"l"}
              startIcon={{ name: "ri-close-line" }}
              hideText
              onClick={handleClose}
            />
          </div>
          <Paper size={"s"} classNames={{ base: "flex w-full flex-col gap-3" }} container={"transparent"}>
            <PrimaryMenu />
            <SecondaryMenu />
          </Paper>
        </div>
      </Modal>
    </>
  );
}

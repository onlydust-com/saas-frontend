import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Modal } from "@/design-system/molecules/modal";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
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
        background={"quaternary"}
        border={"none"}
        classNames={{ base: "flex justify-between items-center gap-2" }}
      >
        <BaseLink href={NEXT_ROUTER.home.root}>
          <Logo />
        </BaseLink>

        <div className={"flex flex-row gap-3"}>
          <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Bell }} iconOnly />
          <Button variant={"tertiary"} size={"xs"} startIcon={{ component: Menu }} iconOnly onClick={handleOpen} />
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

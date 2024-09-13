import { useState } from "react";

import { Modal } from "@/design-system/molecules/modal";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NotificationsButton } from "@/shared/features/notifications/_components/notifications-button/notifications-button";
import { NotificationsContent } from "@/shared/features/notifications/_components/notifications-content/notifications-content";

export function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <NotificationsButton onClick={handleOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
        hideHeader={true}
        placement={"bottom"}
        classNames={{ modal: "max-w-none rounded-b-none !m-0 max-h-[calc(100%_-_24px)]" }}
        as={ScrollView}
      >
        <NotificationsContent onClose={handleClose} />
      </Modal>
    </>
  );
}

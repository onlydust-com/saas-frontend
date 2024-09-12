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

  // TODO @hayden handle horizontal scroll

  return (
    <>
      <NotificationsButton onClick={handleOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
        hideHeader={true}
        placement={"bottom"}
        classNames={{ modal: "min-w-full max-w-full rounded-b-none !my-0 max-h-72" }}
        as={ScrollView}
      >
        <NotificationsContent onClose={handleClose} />
      </Modal>
    </>
  );
}

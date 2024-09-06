import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { X } from "lucide-react";
import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { ModalPort } from "@/design-system/molecules/modal";
import { ModalNextUiVariants } from "@/design-system/molecules/modal/adapters/next-ui/next-ui.variants";

import { cn } from "@/shared/helpers/cn";

export function ModalNextUiAdapter<C extends ElementType = "div">({
  htmlProps,
  as,
  children,
  isOpen,
  onOpenChange,
  classNames,
  titleProps,
  closeButtonProps,
  footer,
  canDismiss = true,
  hideHeader = false,
  placement,
  size,
  container,
}: ModalPort<C>) {
  const Inner = as || "div";
  const slots = ModalNextUiVariants({ size, container });
  const hasTitle = Boolean(titleProps?.translate || titleProps?.children);

  return (
    <Modal
      classNames={{
        base: cn(slots.modal(), classNames?.modal),
        body: cn(slots.body(), classNames?.body),
        backdrop: cn(slots.backdrop(), classNames?.backdrop),
        header: cn(slots.header(), classNames?.header),
        footer: cn(slots.footer(), classNames?.footer),
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={canDismiss}
      isKeyboardDismissDisabled={!canDismiss}
      hideCloseButton
      placement={placement}
    >
      <ModalContent>
        {onClose => (
          <>
            <Inner {...(htmlProps ?? {})}>
              {!hideHeader && (
                <ModalHeader className={"empty:hidden"}>
                  {hasTitle ? <Typo {...titleProps} classNames={{ base: "truncate" }} /> : null}
                  {canDismiss ? (
                    <Button {...closeButtonProps} iconOnly startIcon={{ component: X }} onClick={onClose} />
                  ) : null}
                </ModalHeader>
              )}
              <ModalBody>{children}</ModalBody>
              {footer?.startContent || footer?.endContent ? (
                <ModalFooter>
                  <div>{footer?.startContent}</div>
                  <div>{footer?.endContent}</div>
                </ModalFooter>
              ) : null}
            </Inner>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

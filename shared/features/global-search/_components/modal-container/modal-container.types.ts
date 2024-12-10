import { PropsWithChildren } from "react";

export interface ModalProps {
  isOpen: boolean;
}

export type ModalContainerProps = PropsWithChildren<ModalProps>;

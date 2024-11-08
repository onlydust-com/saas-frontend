import { ReactNode } from "react";

export interface PopoverContextPort {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface PopoverPort {
  children: ReactNode[];
  defaultOpen?: boolean;
  controlled?: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  };
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "right-start"
    | "right"
    | "right-end"
    | "left-start"
    | "left"
    | "left-end";
}

export interface PopoverTriggerPort {
  children(args: PopoverContextPort): ReactNode;
}

export interface PopoverContentPort {
  children(args: PopoverContextPort): ReactNode;
  className?: string;
  unstyled?: boolean;
}

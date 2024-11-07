"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { createContext, useContext, useState } from "react";

import { PopoverContentPort, PopoverContextPort, PopoverPort, PopoverTriggerPort } from "@/design-system/atoms/popover";

import { cn } from "@/shared/helpers/cn";

const PopoverContext = createContext<PopoverContextPort>({
  isOpen: false,
  setIsOpen: () => {},
});

export function PopoverNextUiAdapter({ children, defaultOpen = false, placement = "bottom-start" }: PopoverPort) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement={placement} onClick={e => e?.stopPropagation()}>
        {children}
      </Popover>
    </PopoverContext.Provider>
  );
}

PopoverNextUiAdapter.Trigger = function PopoverNextUiAdapterTrigger({ children }: PopoverTriggerPort) {
  const context = useContext(PopoverContext);

  return <PopoverTrigger>{children(context)}</PopoverTrigger>;
};

PopoverNextUiAdapter.Content = function PopoverNextUiAdapterContent({
  children,
  className,
  unstyled,
}: PopoverContentPort) {
  const context = useContext(PopoverContext);

  return (
    <PopoverContent
      className={
        unstyled
          ? cn("rounded-none bg-transparent !p-none shadow-none", className)
          : cn("effect-shadow-lg rounded-lg bg-background-primary !p-lg text-typography-primary", className)
      }
    >
      {children(context)}
    </PopoverContent>
  );
};

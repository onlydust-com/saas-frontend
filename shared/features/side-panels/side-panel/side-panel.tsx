"use client";

import { Variants, motion } from "framer-motion";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import { Paper } from "@/design-system/atoms/paper";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";
import { cn } from "@/shared/helpers/cn";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { SidePanelProps, SidePanelRef, UseSidePanel } from "./side-panel.types";

export const SidePanel = forwardRef(function SidePanel(
  { children, name, classNames }: SidePanelProps,
  ref: ForwardedRef<SidePanelRef>
) {
  const { open, close, container, isOpen, isOpenLast, getPanelIndex, config, back } = useSidePanelsContext();

  const isTablet = useIsTablet("lower");

  const animate: Variants = {
    isClosed: { transform: "translateX(100%)", opacity: 0 },
    isOpen: { transform: "translateX(0%)", opacity: 1 },
  };

  const animateTablet: Variants = {
    isClosed: { transform: "translateY(100%)", opacity: 0 },
    isOpen: { transform: "translateY(0%)", opacity: 1 },
  };

  useImperativeHandle(ref, () => {
    return {
      open: (config?: SidePanelConfig) => open(name, config),
      isOpen: isOpen(name),
      close: current => close(current ? name : undefined),
      back: () => back(),
      name,
    };
  }, [open, close, isOpen, name, back]);

  const animateKey = isOpenLast(name) ? "isOpen" : "isClosed";

  return (
    <>
      {isOpenLast(name) &&
        isTablet &&
        createPortal(
          <div className={"fixed inset-0 size-full bg-transparent"} onClick={() => close(name)} />,
          document.body
        )}
      {createPortal(
        <motion.div
          variants={isTablet ? animateTablet : animate}
          animate={animateKey}
          transition={{ type: "ease", duration: 0.25 }}
          initial={false}
          className={cn(
            "absolute right-0 translate-x-full opacity-0",
            { "top-0 h-full translate-x-full": !isTablet },
            { "fixed bottom-0 h-auto translate-y-full p-3": isTablet },
            classNames?.container
          )}
          style={{
            minWidth: isTablet ? "100%" : config.width,
            width: isTablet ? "100%" : config.width,
            zIndex: getPanelIndex(name),
          }}
        >
          <Paper
            size={"s"}
            border={"none"}
            classNames={{
              base: cn(
                "h-full w-full flex flex-col gap-3",
                { "h-auto max-h-dvh overflow-auto": isTablet },
                classNames?.content
              ),
            }}
            container={"2"}
          >
            {children}
          </Paper>
        </motion.div>,
        !isTablet ? container.current || document.body : document.body
      )}
    </>
  );
});

export const useSidePanel = (props: Omit<SidePanelProps, "children">, config?: SidePanelConfig): UseSidePanel => {
  const ref = useRef<SidePanelRef>(null);

  const { isOpen } = useSidePanelsContext();

  return {
    Panel: ({ children }) => (
      <SidePanel ref={ref} {...props}>
        {children}
      </SidePanel>
    ),
    open: () => ref.current?.open(config),
    close: current => ref.current?.close(current),
    back: () => ref.current?.back(),
    isOpen: ref.current?.name ? isOpen(ref.current?.name) : false,
    name: props.name,
  };
};

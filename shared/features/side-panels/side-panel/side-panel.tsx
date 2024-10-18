"use client";

import { Variants, motion } from "framer-motion";
import {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { SidePanelConfig } from "@/shared/features/side-panels/side-panels.types";
import { cn } from "@/shared/helpers/cn";
import { useIsTablet } from "@/shared/hooks/ui/use-media-query";

import { SidePanelProps, SidePanelRef, UseSidePanel } from "./side-panel.types";

export const SidePanel = forwardRef(function SidePanel<T extends AnyType>(
  { children, name, classNames }: SidePanelProps,
  ref: ForwardedRef<SidePanelRef>
) {
  const { open, close, container, isOpen, isOpenLast, getPanelIndex, config, back, openedPanels, getData } =
    useSidePanelsContext();

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
      open: (data?: T, config?: SidePanelConfig) => open(name, data, config),
      isOpen: isOpen(name),
      getData: () => getData<T>(name),
      close: (current?: boolean) => close(current ? name : undefined),
      back: () => back(),
      name,
    };
  }, [open, close, isOpen, name, back, getData]);

  const animateKey = isOpenLast(name) ? "isOpen" : "isClosed";

  const panelContent = useMemo(() => {
    if (openedPanels.length && isOpen(name)) {
      return children;
    }

    return null;
  }, [openedPanels, isOpen, name, children]);

  return (
    <>
      {isOpenLast(name) &&
        isTablet &&
        createPortal(
          <div className={"bg-container-backdrop fixed inset-0 size-full"} onClick={() => close(name)} />,
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
            { "fixed bottom-0 h-[calc(100%_-_64px)] translate-y-full p-md": isTablet },
            { invisible: !isOpenLast(name) },
            classNames?.container
          )}
          style={{
            minWidth: isTablet ? "100%" : config.width,
            width: isTablet ? "100%" : config.width,
            zIndex: getPanelIndex(name),
          }}
        >
          <Paper
            border={"none"}
            background={"transparent"}
            py={"none"}
            px={"none"}
            classNames={{
              base: cn(
                "h-full w-full flex flex-col gap-px overflow-hidden",
                { "max-h-dvh": isTablet },
                classNames?.content
              ),
            }}
          >
            {panelContent}
          </Paper>
        </motion.div>,
        !isTablet ? container.current || document.body : document.body
      )}
    </>
  );
});

export const useSidePanel = <T extends AnyType>(
  { name, classNames }: Omit<SidePanelProps, "children">,
  config?: SidePanelConfig
): UseSidePanel<T> => {
  const ref = useRef<SidePanelRef<T>>(null);

  const { isOpen } = useSidePanelsContext();

  const Panel = useCallback(
    ({ children }: PropsWithChildren) => {
      return (
        <SidePanel ref={ref} name={name} classNames={classNames}>
          {children}
        </SidePanel>
      );
    },
    [name, classNames]
  );

  return useMemo(() => {
    return {
      Panel,
      open: (data?: T) => ref.current?.open(data, config),
      close: (current?: boolean) => ref.current?.close(current),
      back: () => ref.current?.back(),
      isOpen: ref.current?.name ? isOpen(ref.current?.name) : false,
      getData: ref.current?.getData,
      name,
    };
  }, [ref, name, classNames, config, isOpen]);
};

export function useSinglePanelContext<T extends AnyType>(name: string, config?: SidePanelConfig) {
  const { open, close, back, isOpen, getData } = useSidePanelsContext();

  return {
    open: (data?: T) => open<T>(name, data, config),
    close: () => close(name),
    back,
    isOpen: isOpen(name),
    name,
    getData: () => getData<T>(name),
  };
}

export function useSinglePanelData<T extends AnyType>(name: string): T | undefined {
  const { isOpen, getData } = useSidePanelsContext();
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (isOpen(name)) {
      setData(getData<T>(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return data;
}

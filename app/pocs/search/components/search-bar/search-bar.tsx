import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Kbd } from "@nextui-org/kbd";
import { motion, useAnimation } from "framer-motion";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useKey } from "react-use";

import { useSearchHotKey } from "@/app/pocs/search/hooks/useSearchHotKey/useSearchHotKey";

import { Input } from "@/design-system/atoms/input";
import { Paper } from "@/design-system/atoms/paper";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { SearchBarProps } from "./search-bar.types";

function Prediction({ value, prediction }: { value: string | null; prediction?: string }) {
  const parsedPrediction = useMemo(() => {
    if (!prediction) {
      return [];
    }

    const withoutSearchContent = prediction.toLowerCase().replace(value?.toLowerCase() ?? "", "");

    return withoutSearchContent.split("");
  }, [prediction, value]);

  const ctrls = useAnimation();

  const { ref } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (parsedPrediction) {
      ctrls.start("visible");
    }
  }, [parsedPrediction]);

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: "10px",
    },
    visible: {
      opacity: 1,
      y: "0px",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <div
      className={"pointer-events-none absolute left-0 top-1/2 flex h-full w-fit -translate-y-1/2 items-center px-2xl"}
    >
      <p className={"text-[1rem] leading-[1.5rem] text-typography-brand-primary opacity-40"}>
        <span className={"opacity-0"}>{value}</span>
        {parsedPrediction.map((p, index) => (
          <motion.span
            key={index}
            ref={ref}
            initial="hidden"
            animate={ctrls}
            variants={characterAnimation}
            className={"inline-block"}
            transition={{
              delay: index * 0.25,
            }}
          >
            {p}
          </motion.span>
        )) ?? ""}
      </p>
    </div>
  );
}

export function SearchBar({ children, value, onChange, prediction }: SearchBarProps) {
  const [openResult, setOpenResult] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useSearchHotKey({ inputRef });

  useKey(
    "Tab",
    () => {
      if (prediction) {
        onChange(prediction);
      }
    },
    undefined,
    [prediction]
  );

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open: openResult,
    onOpenChange: setOpenResult,
    middleware: [
      flip({ padding: 0 }),
      offset(8),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([role, dismiss]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!openResult) {
      setOpenResult(true);
    }
    onChange(event.target.value);
  }

  return (
    <div className={"relative"}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <div className={"relative"}>
          <Input
            name={"search"}
            placeholder={"Search"}
            size={"lg"}
            endContent={<Kbd keys={["command"]}>K</Kbd>}
            ref={inputRef}
            onChange={handleChange}
            value={value ?? ""}
          />
          <Prediction value={value} prediction={prediction} />
        </div>
      </div>
      <FloatingPortal>
        {openResult && (
          <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={"z-[9999] w-full"}>
              <Paper classNames={{ base: "flex w-full flex-col gap-3 max-h-[500px] overflow-hidden" }}>
                <ScrollView>
                  <div className={"flex w-full flex-col gap-3"}>{children}</div>
                </ScrollView>
              </Paper>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  );
}

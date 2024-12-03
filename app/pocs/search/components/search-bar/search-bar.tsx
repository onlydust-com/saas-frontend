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
import { ChangeEvent, useRef, useState } from "react";

import { useSearchHotKey } from "@/app/pocs/search/hooks/useSearchHotKey/useSearchHotKey";

import { Input } from "@/design-system/atoms/input";
import { Paper } from "@/design-system/atoms/paper";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { SearchBarProps } from "./search-bar.types";

export function SearchBar({ children, value, onChange, prediction }: SearchBarProps) {
  const [openResult, setOpenResult] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useSearchHotKey({ inputRef });

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
          <div
            className={
              "pointer-events-none absolute left-0 top-1/2 flex h-full w-full -translate-y-1/2 items-center px-2xl"
            }
          >
            <p className={"text-[1rem] leading-[1.5rem] text-typography-secondary opacity-40"}>{prediction ?? ""}</p>
          </div>
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

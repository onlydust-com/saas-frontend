import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useEffect, useState } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuDefaultAdapter } from "@/design-system/molecules/menu/adapters/default/default.adapter";

import { ListMenuPort, MenuBasePort, PopOverMenuPort } from "../menu.types";

export function MenuPopover({ children, onOpenChange, closeOnSelect, isPopOver: _, ...props }: PopOverMenuPort) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip({ padding: 0 }), offset(8)],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  useEffect(() => {
    onOpenChange?.(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleSelect(...args: Parameters<NonNullable<MenuBasePort["onSelect"]>>) {
    if (closeOnSelect) {
      setIsOpen(false);
    }

    props.onSelect?.(...args);
  }

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <>
          <FloatingOverlay lockScroll={true}>
            <FloatingPortal>
              <FloatingFocusManager context={context} modal={false}>
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                  {withComponentAdapter<ListMenuPort>(MenuDefaultAdapter)({
                    ...props,
                    onSelect: handleSelect,
                  })}
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          </FloatingOverlay>
        </>
      )}
    </>
  );
}

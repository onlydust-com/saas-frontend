import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import { useGlobalSearch } from "../../global-search.context";
import { ModalContainerProps } from "./modal-container.types";

function ModalContainer({ children }: ModalContainerProps) {
  const { isOpen, onOpenChange } = useGlobalSearch();
  return (
    <div className={"fixed inset-0 z-[999999] w-full"} style={{ pointerEvents: isOpen ? "auto" : "none" }}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={"absolute inset-0 -z-[1] bg-background-overlay"}
              onClick={() => onOpenChange(false)}
            />
            <motion.div
              key="modal"
              initial={{ scale: 0.95, translateX: "-50%", opacity: 0 }}
              animate={{ scale: 1, translateX: "-50%", opacity: 1 }}
              exit={{ scale: 0.95, translateX: "-50%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={
                "absolute left-1/2 top-[15%] z-[1] flex h-fit w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              }
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ModalPortal({ children }: ModalContainerProps) {
  return createPortal(<ModalContainer>{children}</ModalContainer>, document.body);
}

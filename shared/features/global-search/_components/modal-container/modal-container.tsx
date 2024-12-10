import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import { ModalContainerProps } from "./modal-container.types";

function ModalContainer({ children, isOpen }: ModalContainerProps) {
  return (
    <div className={"fixed inset-0 z-[999999]"} style={{ pointerEvents: isOpen ? "auto" : "none" }}>
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
            />
            <motion.div
              key="modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={"absolute inset-0 z-[1] flex items-center justify-center"}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ModalPortal({ children, isOpen }: ModalContainerProps) {
  return createPortal(<ModalContainer isOpen={isOpen}>{children}</ModalContainer>, document.body);
}

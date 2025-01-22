import { motion } from "framer-motion";

import { HoverEffectProps } from "@/design-system/molecules/cards/card-project-marketplace/_components/hover-effect/hover-effect.types";

import { cn } from "@/shared/helpers/cn";

export function HoverEffect({ showBorder = false }: HoverEffectProps) {
  return (
    <motion.div
      className={cn(
        "absolute inset-[-2px] z-10 overflow-hidden rounded-[12px] opacity-0 transition-opacity duration-500 ease-in",
        {
          "opacity-100": showBorder,
        }
      )}
    >
      <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px]">
        {showBorder && (
          <motion.div
            className="card-hover-gradient-solid absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        )}
      </div>
      <div className="absolute inset-[2px] overflow-hidden rounded-[10px] bg-background-primary" />
      <div className="absolute inset-[2px] overflow-hidden rounded-[10px] bg-background-secondary" />
    </motion.div>
  );
}
